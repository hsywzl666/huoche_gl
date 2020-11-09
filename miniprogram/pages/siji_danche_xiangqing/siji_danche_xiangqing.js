// pages/siji_danche_xiangqing/siji_danche_xiangqing.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zongjine:0,
    jine_1:0,
    jine_2:0,
    jine_3:0,
    jine_4:0,
    jine_5:0,
    jine_6:0,
    zengjiaxinxi:'',
    disabled_jiayi:'false',
    disabled_1:'disabled',
    disabled_2:'disabled',
    disabled_3:'disabled',
    disabled_4:'disabled',
    disabled_5:'disabled',
    disabled_6:'disabled',
    yinceng_1:false,
    yinceng_2:false,
    yinceng_3:false,
    yinceng_4:false,
    yinceng_5:false,
    xiangqing_1:false,
    xiangqing_2:true,
    xiangqing_3:true,
    xiangqing_4:true,
    xiangqing_5:true,
    xiangqing_6:true,
    shu:1,
    wb_xianshi:false,
    fy_xianshi:false,
    jiaodian_huoqushu:1
  },
  //input项目取值
  xm_1 :function(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=2){
    this.setData({
      disabled_1:'',
    })
}else if((zhi).length<2){
  this.setData({
    disabled_1:'disabled',
  })
}
  },
  xm_2 :function(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=2){
    this.setData({
      disabled_2:'',
    })
}else if((zhi).length<2){
  this.setData({
    disabled_2:'disabled',
  })
}
  },
  xm_3 :function(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=2){
    this.setData({
      disabled_3:'',
    })
}else if((zhi).length<2){
  this.setData({
    disabled_3:'disabled',
  })
}
  },
  xm_4 :function(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=2){
    this.setData({
      disabled_4:'',
    })
}else if((zhi).length<2){
  this.setData({
    disabled_4:'disabled',
  })
}
  },
  xm_5 :function(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=2){
    this.setData({
      disabled_5:'',
    })
}else if((zhi).length<2){
  this.setData({
    disabled_5:'disabled',
  })
}
  },
  xm_6 :function(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=2){
    this.setData({
      disabled_6:'',
    })
}else if((zhi).length<2){
  this.setData({
    disabled_6:'disabled',
  })
}
  },
  //input金额取值
  jine_1(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=1){

  this.setData({
    zongjine:zongjine,
    zengjiaxinxi:'增加信息',
    disabled_jiayi:'',
    jine_1:zhi
  })
  let zongjine = parseInt(this.data.jine_1)+parseInt(this.data.jine_2)+parseInt(this.data.jine_3)+parseInt(this.data.jine_4)+parseInt(this.data.jine_5)+parseInt(this.data.jine_6)
  this.setData({
    zongjine:zongjine,
  })
  console.log(zongjine);
}
  },
  jine_2(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=1){
  this.setData({
    zengjiaxinxi:'增加信息',
    disabled_jiayi:'',
    jine_2:zhi
  })
  let zongjine = parseInt(this.data.jine_1)+parseInt(this.data.jine_2)+parseInt(this.data.jine_3)+parseInt(this.data.jine_4)+parseInt(this.data.jine_5)+parseInt(this.data.jine_6)
  this.setData({
    zongjine:zongjine,
  })
}
  },
  jine_3(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=1){
  this.setData({
    zengjiaxinxi:'增加信息',
    disabled_jiayi:'',
    jine_3:zhi
  })
  let zongjine = parseInt(this.data.jine_1)+parseInt(this.data.jine_2)+parseInt(this.data.jine_3)+parseInt(this.data.jine_4)+parseInt(this.data.jine_5)+parseInt(this.data.jine_6)
  this.setData({
    zongjine:zongjine,
  })
}
  },
  jine_4(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=1){
  this.setData({
    zengjiaxinxi:'增加信息',
    disabled_jiayi:'',
    jine_4:zhi
  })
  let zongjine = parseInt(this.data.jine_1)+parseInt(this.data.jine_2)+parseInt(this.data.jine_3)+parseInt(this.data.jine_4)+parseInt(this.data.jine_5)+parseInt(this.data.jine_6)
  this.setData({
    zongjine:zongjine,
  })
}
  },
  jine_5(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=1){
  this.setData({
    zengjiaxinxi:'增加信息',
    disabled_jiayi:'',
    jine_5:zhi
  })
  let zongjine = parseInt(this.data.jine_1)+parseInt(this.data.jine_2)+parseInt(this.data.jine_3)+parseInt(this.data.jine_4)+parseInt(this.data.jine_5)+parseInt(this.data.jine_6)
  this.setData({
    zongjine:zongjine,
  })
}
  },
  jine_6(e){
    let zhi = e.detail.value
console.log(e.detail.value);
if((zhi).length>=1){
this.setData({
  jine_6:zhi
})
let zongjine = parseInt(this.data.jine_1)+parseInt(this.data.jine_2)+parseInt(this.data.jine_3)+parseInt(this.data.jine_4)+parseInt(this.data.jine_5)+parseInt(this.data.jine_6)
this.setData({
  zongjine:zongjine,
})
}
  },

  //加一
  jiayi(){

    let shu = this.data.shu;
   if(shu < 6){
    let shu = this.data.shu+1;
   this.setData({
    shu:shu
   })
   if(shu==2){
    this.setData({
      disabled_jiayi:'false',
     xiangqing_2:false,
     yinceng_1:true
    })
   }else if(shu==3){
     this.setData({
      disabled_jiayi:'false',
       xiangqing_3:false,
       yinceng_2:true
      })
    }
    else if(shu==4){
     this.setData({
      disabled_jiayi:'false',
       xiangqing_4:false,
       yinceng_3:true
      })
    }
    else if(shu==5){
     this.setData({
      disabled_jiayi:'false',
       xiangqing_5:false,
       yinceng_4:true
      })
    }
    else if(shu==6){
     this.setData({
      zengjiaxinxi:'',
      disabled_jiayi:'false',
       xiangqing_6:false,
       yinceng_5:true
      })
    }
  }else{}
 console.log(shu );


  },
  //返回
  fanhui(){
    this.setData({
         shu:1,
      wb_xianshi:false,
      fy_xianshi:false,
          yinceng_1:false,
    yinceng_2:false,
    yinceng_3:false,
    yinceng_4:false,
    yinceng_5:false,
    xiangqing_1:false,
    xiangqing_2:true,
    xiangqing_3:true,
    xiangqing_4:true,
    xiangqing_5:true,
    xiangqing_6:true,
    })
  },
  // 维保
  wb(){
    console.log('维保');
    this.setData({
      wb_xianshi:true,
    })
  },
  // 费用
  fy(){
console.log('费用');
this.setData({
  fy_xianshi:true,
})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options.id);
db.collection('chepai_xinxi').where({
  _id:options.id
}).get().then(res => {
  console.log(res.data)
    this.setData({

    })})
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