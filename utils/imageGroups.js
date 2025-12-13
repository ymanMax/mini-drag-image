// 图片分组管理工具

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 默认分组数据
const defaultGroups = [
  {
    id: 'all',
    name: '全部图片',
    color: '#666666',
    createTime: new Date().toISOString(),
    imageCount: 0
  },
  {
    id: 'work',
    name: '工作',
    color: '#1890ff',
    createTime: new Date().toISOString(),
    imageCount: 0
  },
  {
    id: 'life',
    name: '生活',
    color: '#52c41a',
    createTime: new Date().toISOString(),
    imageCount: 0
  },
  {
    id: 'travel',
    name: '旅行',
    color: '#fa8c16',
    createTime: new Date().toISOString(),
    imageCount: 0
  }
];

// 图片分组管理类
class ImageGroups {
  constructor() {
    this.groups = this.loadGroups();
    this.images = this.loadImages();
  }

  // 从本地存储加载分组
  loadGroups() {
    try {
      const stored = wx.getStorageSync('image_groups');
      return stored ? JSON.parse(stored) : defaultGroups;
    } catch (error) {
      console.error('加载分组失败:', error);
      return defaultGroups;
    }
  }

  // 保存分组到本地存储
  saveGroups() {
    try {
      wx.setStorageSync('image_groups', JSON.stringify(this.groups));
    } catch (error) {
      console.error('保存分组失败:', error);
    }
  }

  // 从本地存储加载图片
  loadImages() {
    try {
      const stored = wx.getStorageSync('group_images');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('加载图片失败:', error);
      return {};
    }
  }

  // 保存图片到本地存储
  saveImages() {
    try {
      wx.setStorageSync('group_images', JSON.stringify(this.images));
    } catch (error) {
      console.error('保存图片失败:', error);
    }
  }

  // 获取所有分组
  getAllGroups() {
    return [...this.groups];
  }

  // 获取指定分组
  getGroupById(id) {
    return this.groups.find(group => group.id === id);
  }

  // 创建新分组
  createGroup(name, color = '#666666') {
    const newGroup = {
      id: generateId(),
      name: name,
      color: color,
      createTime: new Date().toISOString(),
      imageCount: 0
    };

    this.groups.push(newGroup);
    this.saveGroups();
    return newGroup;
  }

  // 更新分组
  updateGroup(id, updates) {
    const index = this.groups.findIndex(group => group.id === id);
    if (index !== -1) {
      this.groups[index] = { ...this.groups[index], ...updates };
      this.saveGroups();
      return this.groups[index];
    }
    return null;
  }

  // 删除分组（将图片移到默认分组）
  deleteGroup(id) {
    if (id === 'all') {
      throw new Error('不能删除"全部图片"分组');
    }

    const index = this.groups.findIndex(group => group.id === id);
    if (index !== -1) {
      // 将该分组的图片移到全部图片
      if (this.images[id]) {
        if (!this.images['all']) {
          this.images['all'] = [];
        }
        this.images['all'] = [...this.images['all'], ...this.images[id]];
        delete this.images[id];
        this.saveImages();
      }

      this.groups.splice(index, 1);
      this.saveGroups();
      this.updateImageCounts();
      return true;
    }
    return false;
  }

  // 添加入图片到分组
  addImageToGroup(groupId, imageUrl) {
    if (!this.images[groupId]) {
      this.images[groupId] = [];
    }

    // 检查是否已存在
    const exists = this.images[groupId].some(img => img.url === imageUrl);
    if (!exists) {
      this.images[groupId].push({
        url: imageUrl,
        addTime: new Date().toISOString()
      });
      this.saveImages();
      this.updateImageCounts();
      return true;
    }
    return false;
  }

  // 从分组删除图片
  removeImageFromGroup(groupId, imageUrl) {
    if (this.images[groupId]) {
      const index = this.images[groupId].findIndex(img => img.url === imageUrl);
      if (index !== -1) {
        this.images[groupId].splice(index, 1);
        this.saveImages();
        this.updateImageCounts();
        return true;
      }
    }
    return false;
  }

  // 将图片移动到另一个分组
  moveImageToGroup(fromGroupId, toGroupId, imageUrl) {
    if (fromGroupId === toGroupId) {
      return false;
    }

    const removed = this.removeImageFromGroup(fromGroupId, imageUrl);
    if (removed) {
      this.addImageToGroup(toGroupId, imageUrl);
      return true;
    }
    return false;
  }

  // 获取分组的图片列表
  getImagesByGroupId(groupId) {
    return this.images[groupId] || [];
  }

  // 更新所有分组的图片数量
  updateImageCounts() {
    this.groups.forEach(group => {
      if (group.id === 'all') {
        // 全部图片数量为所有分组图片数量之和
        let total = 0;
        Object.keys(this.images).forEach(key => {
          if (key !== 'all') {
            total += this.images[key].length;
          }
        });
        group.imageCount = total;
      } else {
        group.imageCount = this.images[group.id] ? this.images[group.id].length : 0;
      }
    });
    this.saveGroups();
  }

  // 生成Mock数据
  generateMockData() {
    // Mock图片URL
    const mockImageUrls = [
      'https://via.placeholder.com/300x300/1890ff/ffffff?text=Work1',
      'https://via.placeholder.com/300x300/1890ff/ffffff?text=Work2',
      'https://via.placeholder.com/300x300/52c41a/ffffff?text=Life1',
      'https://via.placeholder.com/300x300/52c41a/ffffff?text=Life2',
      'https://via.placeholder.com/300x300/52c41a/ffffff?text=Life3',
      'https://via.placeholder.com/300x300/fa8c16/ffffff?text=Travel1',
      'https://via.placeholder.com/300x300/fa8c16/ffffff?text=Travel2'
    ];

    // 清空现有数据
    this.images = {};

    // 添加图片到各个分组
    mockImageUrls.slice(0, 2).forEach(url => {
      this.addImageToGroup('work', url);
    });

    mockImageUrls.slice(2, 5).forEach(url => {
      this.addImageToGroup('life', url);
    });

    mockImageUrls.slice(5, 7).forEach(url => {
      this.addImageToGroup('travel', url);
    });

    return {
      groups: this.getAllGroups(),
      images: this.images
    };
  }

  // 重置所有数据
  resetData() {
    this.groups = defaultGroups;
    this.images = {};
    this.saveGroups();
    this.saveImages();
  }
}

// 导出单例
const imageGroupsInstance = new ImageGroups();

module.exports = imageGroupsInstance;
