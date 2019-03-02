// pages/resultDetil/resultDetil.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '',
    progress_txt: '正在匹配中...',
    did: 1,
    data: [],
    score: '',
    posPic: '',
    sidePic: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight,
      // did: options.did
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
    this.getDetail()
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
  // 获取详情
  getDetail: function () {
    var mythis = this
    wx.request({
      url: app.globalData.apiUrl + '/details',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        'did': mythis.data.did,
      },
      success: function (res) {
        if (res.data && res.data.code == 200) {
          mythis.setData({
            data: res.data.data,
            score: res.data.data.score,
            posPic: res.data.data.positivePic,
            sidePic: res.data.data.sidePic
          })
          mythis.drawProgressbg()
          mythis.drawCircle()
        } else {
          // app.showErrorMsg('登录失败')
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 绘制内圈
  drawProgressbg: function () {
    var mythis = this
    // 绘制危险
    var data = mythis.data.data.riskdict.dangerous
    var valList = []
    var idList = []
    for (var i = 0; i < data.length; i++) {
      valList.push(data[i].val)
      idList.push(data[i].id)
    }
    // 使用 wx.createContext 获取绘图上下文 context 
    for (var i = 0; i < valList.length ;i++){
      var ctx = wx.createCanvasContext('canvasProgressbg' + idList[i] + valList[i]);
      
      ctx.setLineWidth(4);// 设置圆环的宽度
      ctx.setStrokeStyle('#FCE6E7'); // 设置圆环的颜色
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath();//开始一个新的路径
      ctx.arc(45, 45, 40, 0, 2 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke();//对当前路径进行描边
      ctx.draw();
    }
    // 绘制潜危险
    var dataWar = mythis.data.data.riskdict.warning
    var valListWar = []
    var idListWar = []
    for (var i = 0; i < dataWar.length; i++) {
      valListWar.push(dataWar[i].val)
      idListWar.push(dataWar[i].id)
    }
    // 使用 wx.createContext 获取绘图上下文 context 
    for (var i = 0; i < dataWar.length; i++) {
      var ctx = wx.createCanvasContext('canvasProgressbg' + idListWar[i] + valListWar[i]);
      ctx.setLineWidth(4);// 设置圆环的宽度
      ctx.setStrokeStyle('#FFEFDA'); // 设置圆环的颜色
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath();//开始一个新的路径
      ctx.arc(45, 45, 40, 0, 2 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke();//对当前路径进行描边
      ctx.draw();
    }
    // 绘制正常
    var dataNor = mythis.data.data.riskdict.normal
    var valListNor = []
    var idListNor = []
    for (var i = 0; i < dataNor.length; i++) {
      valListNor.push(dataNor[i].val)
      idListNor.push(dataNor[i].id)
    }
    // 使用 wx.createContext 获取绘图上下文 context 
    for (var i = 0; i < dataNor.length; i++) {
      var ctx = wx.createCanvasContext('canvasProgressbg' + idListNor[i] + valListNor[i]);
      ctx.setLineWidth(4);// 设置圆环的宽度
      ctx.setStrokeStyle('#E4F4EC'); // 设置圆环的颜色
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath();//开始一个新的路径
      ctx.arc(45, 45, 40, 0, 2 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke();//对当前路径进行描边
      ctx.draw();
    }
  },
  // 绘制外圈
  drawCircle: function (step) {
    var mythis = this
    // 绘制正常
    var data = mythis.data.data.riskdict.dangerous
    var valList = []
    var idList = []
    for (var i = 0; i < data.length; i++) {
      valList.push(data[i].val)
      idList.push(data[i].id)
    }
    for (var i = 0; i <= valList.length; i++) {
      var context = wx.createCanvasContext('canvasProgress' + idList[i] + valList[i])
      // 设置渐变
      // var gradient = context.createLinearGradient(200, 100, 100, 200)
      // gradient.addColorStop("0", "#2661DD");
      // gradient.addColorStop("0.5", "#40ED94");
      // gradient.addColorStop("1.0", "#5956CC")
      context.setLineWidth(6);
      context.setStrokeStyle('#FC525F')
      context.setLineCap('round')
      context.beginPath()
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(45, 45, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false)
      context.stroke()
      context.draw()
    }
    // 绘制潜在
    var dataWar = mythis.data.data.riskdict.warning
    var valListWar = []
    var idListWar = []
    for (var i = 0; i < dataWar.length; i++) {
      valListWar.push(dataWar[i].val)
      idListWar.push(dataWar[i].id)
    }
    for (var i = 0; i <= dataWar.length; i++) {
      var context = wx.createCanvasContext('canvasProgress' + idListWar[i] + valListWar[i]);
      // 设置渐变
      // var gradient = context.createLinearGradient(200, 100, 100, 200);
      // gradient.addColorStop("0", "#2661DD");
      // gradient.addColorStop("0.5", "#40ED94");
      // gradient.addColorStop("1.0", "#5956CC");

      context.setLineWidth(6);
      context.setStrokeStyle('#F8920F');
      context.setLineCap('round')
      context.beginPath();
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(45, 45, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke();
      context.draw()
    }
    // 绘制正常
    var data = mythis.data.data.riskdict.normal
    var valListNor = []
    var idListNor = []
    for (var i = 0; i < data.length; i++) {
      valListNor.push(data[i].val)
      idListNor.push(data[i].id)
    }
    for (var i = 0; i <= valList.length; i++) {
      var context = wx.createCanvasContext('canvasProgress' + idListNor[i] + valListNor[i])
      // 设置渐变
      // var gradient = context.createLinearGradient(200, 100, 100, 200);
      // gradient.addColorStop("0", "#2661DD");
      // gradient.addColorStop("0.5", "#40ED94");
      // gradient.addColorStop("1.0", "#5956CC");

      context.setLineWidth(6);
      context.setStrokeStyle('#23CA90')
      context.setLineCap('round')
      context.beginPath()
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      context.arc(45, 45, 40, -Math.PI / 2, step * Math.PI - Math.PI / 2, false)
      context.stroke()
      context.draw()
    }
  },
})