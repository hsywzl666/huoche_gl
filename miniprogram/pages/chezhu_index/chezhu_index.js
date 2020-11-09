const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    color:'#F69',
    danwei:'',
    jine:0,
    jine_xinzhi:0,
    chebiao_color:'#59f005',
    baoxian_color:'#59f005',
    chepai:"",
    id:'',
    list:[],
  },
  //经营详情
  jingying_xingqing(e){
    const id = e.currentTarget.id;
    wx.navigateTo({
      url:   "/pages/jingying_xingqing/jingying_xingqing?id="+id,
    })

  },
//开始经营管理
  jingyingguanli(e){
    const id = e.currentTarget.id;
    wx.navigateTo({
      url: "/pages/jiying_guanli/jiying_guanli?id="+id,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  chezhu_zhuce(){
    wx.navigateTo({
      url: "/pages/chezhu_zhuce/chezhu_zhuce",
    })
      
  },
  onLoad: function (options) {
        console.log(options.id);
        
    if( (this.data.jine) >= 10000){
      this.setData({
       danwei:'万',
       jine_xinzhi:(this.data.jine)/10000
      })
     }else{
       this.setData({
         danwei:'元',
         jine_xinzhi:this.data.jine
        })
     }
     //获取openid
         
    const chezhu_openid = wx.getStorageSync("chezhu_openid");
    this.setData({
      openid:chezhu_openid
    })
     if(!chezhu_openid){
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res.result.openid)     
        wx.setStorageSync('chezhu_openid',res.result.openid);
        this.setData({
          openid:res.result.openid
        })
      }
    })}else{}  
    const zhoce_xierushijian = wx.getStorageSync("zhoce_xierushijian");
    const chaxunshijian = wx.getStorageSync("chaxunshijian");
    const guanlikaishi_riqi = wx.getStorageSync("guanlikaishi_riqi");
    console.log(zhoce_xierushijian+'1',chaxunshijian+'2');
    console.log(this.data.openid+'信达');
    //先不判断
    // if(zhoce_xierushijian>=chaxunshijian || guanlikaishi_riqi >chaxunshijian){
  db.collection("chepai_xinxi").where({_openid:this.data.openid}).get({
    success:res=>{
    console.log(res.data);
      //获取时间戳openid
 var timestamp = Date.parse(new Date());  
 timestamp = timestamp / 1000;  
 //console.log("当前时间戳为：" + timestamp);  
 var n = timestamp * 1000;  
 var date = new Date(n);  
 console.log(date);

 //逻辑
 wx.setStorageSync('chaxunshijian',date);
 wx.setStorageSync('cheliang_shuju',res.data);
      this.setData({
       list:res.data,      
      })
       }})
      // }else{console.log('不差');
      //  }
     
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
    const cheliang_shuju = wx.getStorageSync("cheliang_shuju");
  
     this.setData({
      list:cheliang_shuju,      
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
  onShareAppMessage (res) {
   
  },
})