// pages/jingying_xingqing/jingying_xingqing.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chepai:'',
    guanlikaishi_riqi:'',
    che_jiazhi:0,
    jinedanwei:'元'  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options.id);
   db.collection('chepai_xinxi').doc(options.id).get().then(res => {
     let date = res.data.guanlikaishi_riqi;
      var Y = date.getFullYear();  
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
      let rq = Y+'年'+M+'月'+D +'日'
      let  che_jiazhi= res.data.che_jiazhi[0];
      let  chepai= res.data.chepai;
      console.log(res.data);
      
      if(che_jiazhi<1000){
        this.setData({
          jinedanwei:'元',
          che_jiazhi:che_jiazhi,
      
        })
      }else{
        this.setData({
          jinedanwei:'万',
          che_jiazhi:che_jiazhi/10000,
        })
      }
      this.setData({
        chepai:chepai,
        guanlikaishi_riqi:rq,
        id:options.id
      })
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
   let  chepai=this.data.chepai.pai_tou+this.data.chepai.pai_wei

    return { 
      imageUrl:'../../images/yaoshi.png',
      title: "把"+chepai+"车，管理权交给您",
      path:  'pages/genghuansiji/genghuansiji?id='+this.data.id,
    }
  }
})