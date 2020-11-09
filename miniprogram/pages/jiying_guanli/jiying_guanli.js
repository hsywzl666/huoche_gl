// pages/jiying_guanli/jiying_guanli.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    yingli_danwei:'',
    yingli_xinzhi:'',
    houqu_yingli:0,
      danwei:'',
      jine_xinzhi:'',
     gouchekuan:0,
  },

  //获取盈利
  houqu_yingli(e){
    let str = e.detail.value
    this.setData({
      houqu_yingli:str
    })
    if( (this.data.houqu_yingli) >= 10000){
      this.setData({
        yingli_danwei:'万',
        yingli_xinzhi:(this.data.houqu_yingli)/10000
      })
     }else{
       this.setData({
        yingli_danwei:'元',
         yingli_xinzhi:this.data.houqu_yingli
        })
     }
console.log(str);

  },
  //上传
  sc(){
            //获取时间戳
     var timestamp = Date.parse(new Date());  
     timestamp = timestamp / 1000;  
     //console.log("当前时间戳为：" + timestamp);  
     var n = timestamp * 1000;  
     var date = new Date(n);  
       let id= this.data.id
      let b = parseInt(this.data.gouchekuan) - parseInt(this.data.houqu_yingli) 
      let  gouchekuan = parseInt(this.data.gouchekuan)
      let houqu_yingli = parseInt(this.data.houqu_yingli)
       console.log(houqu_yingli- gouchekuan);
       
if(gouchekuan!==0){
  const _ = db.command
  db.collection('chepai_xinxi').doc(id).update({
    data: {
      che_jiazhi: _.push(b),
      guanlikaishi_riqi:date
    }
 
  })

 wx.setStorageSync('guanlikaishi_riqi',date);
  wx.navigateTo({
    url:  "/pages/chezhu_index/chezhu_index?id="+date,
  })
  .then(console.log)
  .catch(console.error)

}else{wx.showToast({
  title: '购车款必须填写',
})}

  },
  //购车款 
  houqu_gouchejine(e){
    let str = e.detail.value
    this.setData({
      gouchekuan:str
    })
    if( (this.data.gouchekuan) >= 10000){
      this.setData({
       danwei:'万',
       jine_xinzhi:(this.data.gouchekuan)/10000
      })
     }else{
       this.setData({
         danwei:'元',
         jine_xinzhi:this.data.gouchekuan
        })
     }
console.log(str);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options);
this.setData({
  id:options.id
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
     //获取时间戳
     var timestamp = Date.parse(new Date());  
     timestamp = timestamp / 1000;  
     //console.log("当前时间戳为：" + timestamp);  
     var n = timestamp * 1000;  
     var date = new Date(n);  
     console.log(date);
     var Y = date.getFullYear();  
     //月  
     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
     //日  
     var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
     let rq = Y+'年'+M+'月'+D +'日'
this.setData({
gouche_riqi:rq
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