// pages/genghuansiji/genghuansiji.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id:'',
   _openid:''
  },
  huansiji(){
          //获取时间戳
 var timestamp = Date.parse(new Date());  
 timestamp = timestamp / 1000;  
 //console.log("当前时间戳为：" + timestamp);  
 var n = timestamp * 1000;  
 var date = new Date(n); 

    console.log('家好');
    let openid = this.data._openid
    let id = this.data.id
    console.log(id);
    console.log('你好');
    
    db.collection('chepai_xinxi').doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        siji_id: openid
      }
    })
    .then(
       wx.setStorageSync('genghuansiji_shijian',date),
       wx.switchTab({
          url:"/pages/shouye/shouye",
        }))
    .catch(console.error)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
        console.log(this.data._openid); 
        this.setData({
          id:options.id,
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

    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res.result.openid)
        this.setData({
          _openid:res.result.openid
        })
       
        db.collection('chepai_xinxi').where({
          siji_id:res.result.openid// 填入当前用户 openid
        }).get().then(res => {
          console.log(res.data)
       
    if((res.data).length>0){  wx.switchTab({
      url:"/pages/shouye/shouye",
    })}
         
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

  }
})