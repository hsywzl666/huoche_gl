const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xianshi:true,
    daibu_jingying:'',
    jingyong:true,
    pai_tou:'',
    chexing:'',
    baocun_chexing:"",
    color:'#ffffff',
    pai_color:'CornflowerBlue',
    _openid:'',
    haoma:'',
    select: false,
    grade_name: '京',
    grades: ['京', '津', '沪','渝','冀','豫','云','辽','黑' ,'湘','皖','鲁','新','苏','浙','赣','鄂','桂','甘','晋','蒙','陕','吉','闽','贵','粤','青','藏','川','宁','琼']
  },

  //经营
  jingyong(){
    this.setData({
      xianshi:  false,
      jingyong:true,
      daibu_jingying:'经营'
    })
  },
  //代步
  daibu(){
  this.setData({
    xianshi:  false,
    jingyong:false,
    daibu_jingying:'代步'
  })
  },
  // 换图   
  huantu(){

    let chexing = this.data.chexing;
    if(chexing=='../../images/jiaoche.png'){
      this.setData({
        xianshi:false,
        baocun_chexing:'xiaohuoche'
      })   
    }else if(chexing=='../../images/xiaohuoche.png'){
      this.setData({
        xianshi:true,
        baocun_chexing:'jiaoche'
      }) 
    }
    else if(chexing=='../../images/huoche.png'){
      this.setData({
        xianshi:false,
        baocun_chexing:'daba'
      })   
    }
    else if(chexing=='../../images/daba.png'){
      this.setData({
        xianshi:false,
        baocun_chexing:'huoche'
      })   
    }
    let pai_color = this.data.pai_color;
    if(pai_color=='CornflowerBlue'){
         if(chexing=='../../images/jiaoche.png'){
          this.setData({
            chexing:'../../images/xiaohuoche.png',
          })
         }
         if(chexing=='../../images/xiaohuoche.png'){
          this.setData({
            chexing:'../../images/jiaoche.png',
          })
         }
    }else if(pai_color=='#f4a31f'){
      if(chexing=='../../images/huoche.png'){
        this.setData({
          chexing:'../../images/daba.png',
        })
       }
       if(chexing=='../../images/daba.png'){
        this.setData({
          chexing:'../../images/huoche.png',
        })
       }
     
    }else if(pai_color=='#48b14e'){
      if(chexing=='../../images/jiaoche.png'){
        this.setData({
          chexing:'../../images/xiaohuoche.png',
        })
       }
       if(chexing=='../../images/xiaohuoche.png'){
        this.setData({
          chexing:'../../images/jiaoche.png',
        })
       }
     
    } else  {
      if(chexing=='../../images/huoche.png'){
        this.setData({
          chexing:'../../images/daba.png',
        })
       }
       if(chexing=='../../images/daba.png'){
        this.setData({
          chexing:'../../images/huoche.png',
        })
       }
    }

  },
// 变色
bianse(){
  if(this.data.pai_color=='CornflowerBlue'){
    this.setData({
      baocun_chexing:'huoche',
      xianshi:false,
      chexing:'../../images/huoche.png',
    })
    this.setData({
    pai_color:'#f4a31f',
    color:'',
  })
}else if(this.data.pai_color=='#f4a31f') {
  this.setData({
    baocun_chexing:'jiaoche',
    xianshi:true,
    chexing:'../../images/jiaoche.png',
  })
  
  this.setData({
    color:'',
    pai_color:'#48b14e',
  })
  }
  else if(this.data.pai_color=='#48b14e') {
    this.setData({
      baocun_chexing:'huoche',
      xianshi:false,
      chexing:'../../images/huoche.png',
      pai_color:'#fafcfe',
    })

    }else  {
    this.setData({
      baocun_chexing:'jiaoche',
      xianshi:true,
      chexing:'../../images/jiaoche.png',
      pai_color:'CornflowerBlue',
    })

    }
  
  
},
// 获取号码
  yaoqingmma(e){

    let grade_name =this.data.grade_name
    //字母转大写
    let str = e.detail.value.toUpperCase() 
    let  a =str.substring(1,0);
    let  b =str.substring(6,1);
  
    this.setData({
      haoma: '·'+b,
      pai_tou:grade_name+a
    })
      console.log(str.substring(6,1));

  },

  zc(){
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
     
    //逻辑
 console.log(this.data.haoma.length);
 
    if(this.data.haoma.length!==6){
      wx.showToast({
        title: '车号不合法',
        mask:true,
      }) 
    }else{
     
      db.collection("chepai_xinxi").where({chepai:this.data.pai_tou+this.data.haoma}).get().then(res => {
        // console.log(res.data.length)
          if(res.data.length==0){   
            db.collection('chepai_xinxi').add({
              data:{
                done:true,
                chepai:{pai_tou:this.data.pai_tou,pai_wei:this.data.haoma},
                siji_id:this.data._openid,
                paizhaose:this.data.pai_color,
                jingying:this.data.jingyong,
                zhoce_xierushijian:date,
                baocun_chexing:this.data.baocun_chexing
              },
              success: res => {
                wx.setStorageSync('zhoce_xierushijian',date);
                wx.showToast({
                  title: '添加成功',
                  mask:true,
                }) 
                wx.navigateTo({
                  url:"/pages/chezhu_index/chezhu_index",
                })  
              },
            }) 
          }else{
            wx.showToast({
              title: '此车存在',
              mask:true,
            })
         }
    })
    
  }
   
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name: name,
      select: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res.result.openid)     
        wx.setStorageSync('_openid', res.result.openid)
        this.setData({
          _openid:res.result.openid
        })
      }
    })  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //设置默认图片
    if(this.data.pai_color=='CornflowerBlue'){

      this.setData({
        baocun_chexing:'jiaoche',
      chexing:'../../images/jiaoche.png',
    })
  }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
