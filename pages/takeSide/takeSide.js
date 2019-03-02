// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    width: '',
    height: '',
    footHeight: '',
    takeborder: '#828185',
    takeBac: '#2D6444',
    left: false,
    right: false,
    top: false,
    bottom: false,
    did: '',
    uid: '',
    canTakePic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var did = wx.getStorageSync('did')
    var uid = wx.getStorageSync('userInfo')
    this.setData({
      did: did,
      uid: uid
    })
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
      footHeight: wx.getSystemInfoSync().windowHeight - 550
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
    var mythis = this
    wx.onAccelerometerChange(function (res) {
      if (res.x < -0.1 && Math.abs(res.x) > Math.abs(res.z)) {
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          right: true
        })
      }
      if (res.x < -0.1 && Math.abs(res.x) < Math.abs(res.z)) {
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          right: false
        })
      }
      if (res.x > 0.1 && Math.abs(res.x) > Math.abs(res.z)) {
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          left: true
        })
      }
      if (res.x > 0.1 && Math.abs(res.x) < Math.abs(res.z)) {
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          left: false
        })
      }
      if (res.x < 0.1 && res.x > -0.1) {
        mythis.setData({
          left: false,
          right: false
        })
      }
      if (res.z > 0.1 && Math.abs(res.z) > Math.abs(res.x)) {
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          bottom: true
        })
      }
      if (res.z > 0.1 && Math.abs(res.z) < Math.abs(res.x)) {
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          bottom: false
        })
      }
      if (res.z < 0.1 && -0.1 < res.z && -0.1 < res.x && res.x < 0.1) {
        // console.log('拍照')
        mythis.setData({
          takeborder: '#FFFFFF',
          takeBac: '#56C785',
          left: false,
          right: false,
          top: false,
          bottom: false,
          canTakePic: true
        })
      }
      if (res.z < -0.1 && Math.abs(res.z) > Math.abs(res.x)) {
        // console.log('将手机往上翻')
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          top: true
        })
      }
      if (res.z < -0.1 && Math.abs(res.z) < Math.abs(res.x)) {
        // console.log('将手机往上翻')
        mythis.setData({
          takeborder: '#828185',
          takeBac: '#2D6444',
          top: false
        })
      }
      if (res.z < 0.1 && res.z > -0.1) {
        mythis.setData({
          top: false,
          bottom: false
        })
      }
    })
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
  takePhoto() {
    const ctx = wx.createCameraContext()
    var uid = parseInt(this.data.uid)
    var did = parseInt(this.data.did)
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.navigateTo({
          url: '../viewSide/viewSide?url=' + res.tempImagePath,
        })
        // this.setData({
        //   canTakePic: false
        // })
        // wx.showLoading({
        //   title: '上传中',
        // })
        // wx.uploadFile({
        //   url: app.globalData.apiUrl + '/upload',
        //   filePath: res.tempImagePath,
        //   name: 'file',
        //   formData: {
        //     'uid': uid,
        //     'did': did,
        //     'field': 'sidePic'
        //   },
        //   success(res) {
        //     // console.log(res)
        //     var data = JSON.parse(res.data)
        //     console.log(data)
        //     if (data && data.code === 200) {
        //       wx.navigateTo({
        //         url: '../viewSide/viewSide?url=' + data.data.fileurl,
        //       })
        //     }
        //   },
        //   fail(res) {
        //     console.log(res)
        //   },
        //   complete(res) {
        //     wx.hideLoading()
        //   }
        // })

      }
    })
  },
})