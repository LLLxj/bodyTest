// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    hasRead: true,
    uid: 1,
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var uid = wx.getStorageSync('userInfo')
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
      // uid: uid,
      p: 1,
      pageSize: 5
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getResult()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getResult: function () {
    var mythis = this
    wx.request({
      url: app.globalData.apiUrl + '/list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        'uid': mythis.data.uid,
        'p': mythis.data.p,
        'pageSize': mythis.data.pageSize
      },
      success: function (res) {
        if (res.data && res.data.code == 200) {
          mythis.setData({
            dataList: res.data.data
          })
        } else {
          // app.showErrorMsg('登录失败')
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 详情
  getDetail: function (res) {
    var did = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '../resultDetil/resultDetil?did=' + did,
    })
  }
})