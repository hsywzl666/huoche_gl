// pages/jingying_xingqing/jingying_xingqing.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    danche_xiangqing_xianshi:false,
  },
  //司机运营详情
  siji_yunying__xingqing(e){
   console.log(e.currentTarget.id);
   console.log(e);
   wx.navigateTo({
    url: "/pages/siji_danche_xiangqing/siji_danche_xiangqing?id="+e.currentTarget.id,
  })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res.result.openid)     
        db.collection('chepai_xinxi').where({
          siji_id:res.result.openid// 填入当前用户 openid
        }).get().then(res => {
          console.log(res.data)
            this.setData({
              list:res.data
            })

        })
      }
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
  onShareAppMessage: function () {

  }
})