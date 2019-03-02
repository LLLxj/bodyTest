// pages/result/result.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    height: '',
    hasRead: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('页面')
    }
    return {
      title: 'xx小程序',
      path: 'pages/home/home',
      success: res => {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: res => {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      },
      complete: res => {
        console.log('3')
      }
    
    }
  },
  toTakePic: function () {
    wx.navigateTo({
      url: '../bodyDate/bodyDate',
    })
  },
  toAgree: function () {
    wx.navigateTo({
      url: '../agreeMent/agreeMent',
    })
  },
  // 分享
  shareToFriend: function () {

  },
  getPhoneNumber: function (e) {
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.apiUrl + '/login',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          data: {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv,
            'code': res.code
          },
          success: function (res) {
            if (res.data && res.data.code == 200) {
              //存入缓存即可
              wx.setStorage({
                key: "userInfo",
                data: res.data.data.uid,
                success(res) {
                  console.log(res)
                },
                fail(err) {
                  console.log(err)
                }
              })

              // app.showsuccessMsg('登录成功')
              setTimeout(function () {
                wx.navigateTo({
                  url: '../bodyDate/bodyDate'
                })
              }, 1000)
            } else {
              app.showErrorMsg('登录失败')
            }
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  }, 
  hasRead: function () {
    if(this.data.hasRead == true){
      this.setData({
        hasRead: false
      })
    } else {
      this.setData({
        hasRead: true
      })
    }
    
  }
})