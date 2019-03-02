// pages/bodyDate/bodyDate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexarray: ['女生', '男生'],
    ageArray: [],
    weightArray: [],
    heightArray: [],
    name:'',
    sex: '女生',
    height: 165,
    age: 20,
    weight: 60,
    canConfirm: false,
    // 按钮的背景色
    bac: '#A8E8D0',
    uid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      uid: userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setAgeRange()
    this.setHeightRange()
    this.setWeightRange()
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
  onShareAppMessage: function () {

  },
  // next: function () {
  //   wx.navigateTo({
  //     url: '../takePic/takePic',
  //   })
  // },
  bindName: function(res) {
    var mythis = this
    mythis.setData({
      name: res.detail.value
    })
    mythis.watchForm()
  },
  bindPickerChange: function (event) {
    // 选择性别
    var mythis = this
    mythis.setData({
      sex: mythis.data.sexarray[event.detail.value]
    })
    mythis.watchForm()
  },
  bindChangeAge: function (event) {
    // 选择年龄
    var mythis = this
    mythis.setData({
      age: mythis.data.ageArray[event.detail.value]
    })  
  },
  bindChangeWeight: function (event) {
    // 选择体重
    var mythis = this
    mythis.setData({
      weight: mythis.data.weightArray[event.detail.value]
    })
    mythis.watchForm()
  },
  bindChangeHeight: function (event) {
    // 选择身高
    var mythis = this
    mythis.setData({
      height: mythis.data.heightArray[event.detail.value]
    })
    mythis.watchForm()
  },
  watchForm: function () {
    var name = this.data.name
    var sex = this.data.sex
    var age = this.data.age
    var height = this.data.height
    var weight = this.data.weight
    if (name !== '' && sex !== '' && age !== '' && height !== '' && weight !== ''){
      this.setData({
        canConfirm: true,
        bac: '#24C68B'
      })
    } else {
      this.setData({
        canConfirm: false,
        bac: '#A8E8D0'
      })
    }
  },
  setAgeRange: function () {
    var ageArray = []
    for(var i = 12;i < 101;i++ ){
      ageArray[i-12] = i
    }
    this.setData({
      ageArray: ageArray
    })
  },
  setWeightRange: function () {
    var weightArray = []
    for (var i = 30; i < 150; i++) {
      weightArray[i - 30] = i
    }
    this.setData({
      weightArray: weightArray
    })
  },
  setHeightRange: function () {
    var heightArray = []
    for (var i = 120; i < 231; i++) {
      heightArray[i - 120] = i
    }
    this.setData({
      heightArray: heightArray
    })
  },
  formSubmit: function (res) {
    var sex = this.data.sex
    var age = parseInt(this.data.age)
    var height = parseInt(this.data.height)
    var heavy = parseInt(this.data.weight)
    if (sex == '男生') {
      sex = 1
    } else {
      sex = 0
    }
    if (this.data.canConfirm == true){
      wx.request({
        url: app.globalData.apiUrl + '/data',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {
          'userName': this.data.name,
          'sex': sex,
          'age': age,
          'height': height,
          'heavy': heavy,
          'uid': this.data.uid
        },
        success: function (res) {
          if (res.data && res.data.code == 200) {
            wx.setStorage({
              key: "did",
              data: res.data.data.did,
              success(res) {
                console.log(res)
              },
              fail(err) {
                console.log(err)
              }
            })
            wx.navigateTo({
              url: '../takePic/takePic',
            })
          } else {
            // app.showErrorMsg('登录失败')
          }
        },
        fail: function (err) {
          console.log(err);
        }
      })
    }
  }
})