// pages/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    imageWitdh:0,
    x:0,  // movable-view的坐标
    y:0,
    areaHeight:0,  // movable-area的高度
    hidden: true, // movable-view是否隐藏
    currentImg:'', // movable-view的图片地址
    currentIndex:0, // 要改变顺序的图片的下标
    pointsArr:[], // 每张图片的坐标
    flag:true, // 是否是长按
    scrollTop:0, // 滚动条距离顶部的距离

    // 分组相关数据
    groups: [
      { id: 1, name: '默认分组', color: '#333333' },
      { id: 2, name: '工作', color: '#1890ff' },
      { id: 3, name: '生活', color: '#52c41a' },
      { id: 4, name: '旅行', color: '#fa8c16' },
    ],
    currentGroupId: 1, // 当前选中的分组ID
    showGroupModal: false, // 分组管理弹窗是否显示
    newGroupName: '', // 新分组名称输入框内容
    selectedColor: '#333333', // 选中的分组颜色
    presetColors: [
      { name: '灰色', value: '#333333' },
      { name: '蓝色', value: '#1890ff' },
      { name: '绿色', value: '#52c41a' },
      { name: '橙色', value: '#fa8c16' },
      { name: '红色', value: '#f5222d' },
      { name: '紫色', value: '#722ed1' },
      { name: '粉色', value: '#eb2f96' },
      { name: '青色', value: '#13c2c2' },
    ],
  },

  // 计算图片宽度
  _handleComputedImage:function(e){
    const windowWidth = app.globalData.systemInfo.windowWidth;
    const width = windowWidth - 16;
    const imageWitdh = (width - 16) / 3;
    this.setData({
      imageWitdh
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
  },

  // 选择图片
  handleChooseImage: function (e) {
    let length = this.data.images.length;
    if (length == 9) {
      wx.showToast({
        title: "亲，最多只能选择九张图哦~",
        icon: "none",
        duration: 2000
        // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
      return false;
    }
    var that = this;
    wx.chooseImage({
      count: 9 - this.data.images.length,
      sizeType: ['compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        let images = that.data.images;
        for (let i = 0; i < res.tempFilePaths.length;i++){
          images.push(res.tempFilePaths[i]);
        }
        that.setData({
          images
        },function(){
          //上传完之后更新面积
          that._handleComputedArea();
          // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
});
        
      },
      fail: err => console.log(err)
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
  },

  // 预览图片
  handlePreview:function(e){
    let index = e.target.dataset.index;
    let images = this.data.images;
    wx.previewImage({
      current: images[index], //当前预览的图片
      urls: images, //所有要预览的图片数组
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
  },

  // 删除图片
  handleDelete:function(e){
    let index = e.target.dataset.index;
    let images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images
    },function(){
      this._handleComputedArea();
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
});
  },

  // 计算movable-area的高度
  _handleComputedArea:function(e){
    let that = this;
    wx.createSelectorQuery().selectAll('.image-choose-container').boundingClientRect(function (rect) {
      that.setData({
        areaHeight: rect[0].height
        // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
}).exec()
  },

  // 计算每张图片的坐标
  _handleComputedPoints(e){
    let that = this;
    var query = wx.createSelectorQuery();
    var nodesRef = query.selectAll(".image-item");
    nodesRef.fields({
      dataset: true,
      rect: true
    }, (result) => {
      that.setData({
        pointsArr: result
        // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
}).exec()
  },

  // 长按图片
  handleLongTap:function(e){
    // 计算每张图片的坐标
    this._handleComputedPoints();
    this.setData({
      currentImg: e.currentTarget.dataset.url,
      currentIndex: e.currentTarget.dataset.index,
      hidden: false,
      flag: true,
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
  },

  // 移动的过程中
  handleTouchMove:function(e){
    let x = e.touches[0].pageX;
    let y = e.touches[0].pageY;
   // 首先先获得当前image-choose-container距离顶部的距离
    let that = this;
    wx.createSelectorQuery().selectAll('.image-choose-container').boundingClientRect(function (rect) {
      let top = rect[0].top;
      y = y - that.data.scrollTop - top;
      that.setData({
        // x: x - that.data.imageWitdh / 2 > 0 ? x - that.data.imageWitdh / 2:0,
        // y: y - that.data.imageWitdh / 2 > 0 ? y - that.data.imageWitdh / 2:0,
        x: x,
        y: y,
        // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})

      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
}).exec()
  },

  // 移动结束的时候
  handleTouchEnd:function(e){
    if (!this.data.flag) {
      // 非长按情况下
      return;
    }
    let  x = e.changedTouches[0].pageX;
    let y = e.changedTouches[0].pageY - this.data.scrollTop;
    const pointsArr = this.data.pointsArr;
    let data = this.data.images;
    for (var j = 0; j < pointsArr.length; j++) {
      const item = pointsArr[j];
      if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
        const endIndex = item.dataset.index;
        const beginIndex = this.data.currentIndex;
        //临时保存移动的目标数据
        let temp = data[beginIndex];
        //将移动目标的下标值替换为被移动目标的下标值
        data[beginIndex] = data[endIndex];
        //将被移动目标的下标值替换为beginIndex
        data[endIndex] = temp;
      }
    }
    this.setData({
      images: data,
      hidden: true,
      flag: false,
      currentImg: ''
      // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 计算图片
    this._handleComputedImage();
  },

  // 分组管理相关方法

onPageScroll:function(e){
    this.data.scrollTop = e.scrollTop;
  }

  // 显示分组管理弹窗
  showGroupModal: function() {
    this.setData({
      showGroupModal: true,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 隐藏分组管理弹窗
  hideGroupModal: function() {
    this.setData({
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });
  },

  // 分组名称输入框变化
  onGroupNameInput: function(e) {
    this.setData({
      newGroupName: e.detail.value.trim()
    });
  },

  // 选择颜色
  selectColor: function(e) {
    const color = e.currentTarget.dataset.color;
    this.setData({
      selectedColor: color
    });
  },

  // 确认添加分组
  confirmAddGroup: function() {
    const groupName = this.data.newGroupName;
    const groupColor = this.data.selectedColor;

    // 表单验证
    if (!groupName) {
      wx.showToast({
        title: '请输入分组名称',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (groupName.length > 10) {
      wx.showToast({
        title: '分组名称不能超过10个字符',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 检查分组名称是否已存在
    const isDuplicate = this.data.groups.some(group =>
      group.name === groupName
    );

    if (isDuplicate) {
      wx.showToast({
        title: '该分组名称已存在',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 生成新的分组ID
    const maxId = Math.max(...this.data.groups.map(group => group.id), 0);
    const newGroup = {
      id: maxId + 1,
      name: groupName,
      color: groupColor
    };

    // 添加新分组并更新界面
    const newGroups = [...this.data.groups, newGroup];
    this.setData({
      groups: newGroups,
      showGroupModal: false,
      newGroupName: '',
      selectedColor: '#333333'
    });

    // 显示成功提示
    wx.showToast({
      title: '分组添加成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换分组
  switchGroup: function(e) {
    const groupId = e.currentTarget.dataset.groupId;
    this.setData({
      currentGroupId: groupId
    });

    // TODO: 根据分组切换图片数据
    // 这里可以根据分组ID加载不同的图片列表
    wx.showToast({
      title: `已切换到 ${this.data.groups.find(g => g.id === groupId).name}`,
      icon: 'none',
      duration: 1500
    });
  },

  // 监听滚动
  onPageScroll: function(e) {
    this.data.scrollTop = e.scrollTop;
  }
})