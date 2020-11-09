// pages/zhengjian_index/zhengjian_index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jiazhao_shixiao:true,
    huan_zhengyue:0,
    huan_zhengri:0,
    huan_zhengnian:0,
    yanzhengyue:0,
    yanzhengri:0,
    jialing:{},
    list:[],
    chexing:'',
    yemianqiehuan:false,
    xianshi:false,
    jiazhao:[],
    zhenghao:'',
    xingming:'',
    xingbie:'男',
    xingbies: ['男', '女'],
    select: false,
    youxiaoqi:''
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
      xingbie: name,
      select: false
    })
  },
  //注册
  zhuce(){
    if(this.data.xingming && this.data.zhenghao && this.data.xingming  && this.data.xingbie && this.data.dangan_bianhao && this.data.lingzgeng && this.data.chexing && this.data.youxiaoqi){
      console.log(this.data.xingbie);
      
    if((this.data.zhenghao).length<18){
        wx.showToast({
          title: '身份证少',
        })
      }else if((this.data.dangan_bianhao).length<12){
        wx.showToast({
          title: '档案编号少',
        })
      }else if((this.data.lingzgeng).length<8){
        wx.showToast({
          title: '领证日期少',
        })
      }else if((this.data.youxiaoqi).length<8){
        wx.showToast({
          title: '有效期少',
        })
      }else{
    
        //保存数据
   //获取时间戳
   var timestamp = Date.parse(new Date());  
   timestamp = timestamp / 1000;  
   //console.log("当前时间戳为：" + timestamp);  
   var n = timestamp * 1000;  
   var date = new Date(n);  
   db.collection('jiazhao_dangan').add({
    data:{
      done:true,
      zhenghao:this.data.zhenghao,
      xingming:this.data.xingming,
      xingbie:this.data.xingbie,
      youxiaoqi:this.data.youxiaoqi,
      jiazhao_zhoce_xierushijian:date,
      dangan_bianhao:this.data.dangan_bianhao,
      lingzgeng:this.data.lingzgeng
    },
    success: res => {
      wx.setStorageSync('jiazhao_zhoce_xierushijian',date);
      wx.showToast({
        title: '添加成功',
        mask:true,
      }) 
      //跳转显示
      this.setData({
        yemianqiehuan:false,
        xianshi:true
      })
    }, })  
      }

    }else{
      wx.showToast({
        title: '信息不全',
      })
      
    } 
  },
  //证号
zhenghao(e){
this.setData({
  zhenghao:e.detail.value
})
},
//姓名
xingming(e){
  this.setData({
    xingming:e.detail.value
  })
},
//性别
xingbie(e){
  this.setData({
    xingbie:e.detail.value
  })
},
//档案编号
dangan_bianhao(e){
  this.setData({
    dangan_bianhao:e.detail.value
  })
},
//领证
lingzgeng(e){
  this.setData({
    lingzgeng:e.detail.value
  })
},
//准驾车型
  inputFn: function(e){

   let str = e.detail.value.toUpperCase()
   this.setData({
     chexing:str
   })

},
//有效期
youxiaoqi(e){
  this.setData({
    youxiaoqi:e.detail.value
  })
},
  jiazhao_zhuce(){
  this.setData({
    yemianqiehuan:true,
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取时间戳
      var timestamp = Date.parse(new Date());  
      timestamp = timestamp / 1000;  
      //console.log("当前时间戳为：" + timestamp);  
      var n = timestamp * 1000;  
      var date = new Date(n);  

 
      //年
      var Y = date.getFullYear();            
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
      //转换时间戳(当前日期)
      var time1 = Date.parse(Y+'-'+M+'-'+D);

      console.log(time1);
    db.collection("jiazhao_dangan").where({_openid:''}).get().then(res => {
 
      let  nian =parseInt(res.data[0].lingzgeng.substring(4,0));    
      let  yue =parseInt(res.data[0].lingzgeng.substring(6,4)); 
      let riqi = parseInt(res.data[0].lingzgeng.substring(8,6)); 
  
      
//    判断换证日期
console.log(res.data[0].youxiaoqi);

    let  huan_nian =parseInt(res.data[0].youxiaoqi.substring(4,0));    
    let  huan_yue =parseInt(res.data[0].youxiaoqi.substring(6,4)); 
    let  huan_riqi = parseInt(res.data[0].youxiaoqi.substring(8,6)); 
    console.log(huan_nian+'-'+huan_yue+'-'+huan_riqi);
    //转换时间戳(换证日期)
    var time3 = Date.parse(huan_nian+'-'+huan_yue+'-'+huan_riqi);

    console.log(time3 - time1);
    console.log(time3 + 'ttime3');
    console.log(time1 + 'time1');
    if ((time3 - time1)<=0) {
      //判断驾照是否失效
      this.setData({
        jiazhao_shixiao:false
      })
    }else{
      this.setData({
        jiazhao_shixiao:true
      })
    }
    this.setData({
      huan_zhengnian:huan_nian-Y
    })
    if(huan_yue>=M){
      if(huan_riqi>=D){
      this.setData({
        huan_zhengyue:huan_yue - M,
        huan_zhengri:huan_riqi - D
      })    
        }else if(huan_riqi < D){
        let a = huan_yue - 1
        if( a ==1 || a ==3 || a ==5 || a ==7 || a ==8 || a == 10 || a ==12 ){       
          this.setData({
            huan_zhengyue:a - M,
            huan_zhengri:huan_riqi+31 - D
          }) 
        }else if(a ==4 || a ==6 || a ==9 || a ==11 ){
          this.setData({
            huan_zhengyue:a- M,
            huan_zhengri:huan_riqi+30 - D
          }) 
        }else if(a ==2 ){
          let y = Y/4;
          if(parseInt(y)==y){
            this.setData({
              huan_zhengyue:a - M,
              huan_zhengri:huan_riqi+29 - D
  }) 
              }else{
                this.setData({
                  huan_zhengyue:a - M,
                  huan_zhengri:huan_riqi+28 - D
                }) 
              }}}
        }else if(huan_yue<M){
        if(huan_riqi>=D){
        this.setData({
          huan_zhengyue:huan_yue+12 - M,
          huan_zhengri:huan_riqi - D
        })    
        }else  if(riqi < D){
        let a = huan_yue - 1
        if( a ==1 || a ==3 || a ==5 || a ==7 || a ==8 || a == 10 || a ==12 ){       
          this.setData({
            yanzhengyue:a+12 - M,
            yanzhengri:huan_riqi+31 - D
          }) 
        }else if(a ==4 || a ==6 || a ==9 || a ==11 ){
          this.setData({
            huan_zhengyue:a+12 - M,
            huan_zhengri:huan_riqi+30 - D
          }) 
        }else if(a ==2 ){
          let y = Y/4;
          if(parseInt(y)==y){
            this.setData({
              huan_zhengyue:a+12 - M,
              huan_zhengri:huan_riqi+29 - D
            }) 
          }else{
            this.setData({
              huan_zhengyue:a+12 - M,
              huan_zhengri:huan_riqi+28 - D
            }) 
          }
        }}}
    //判断学习日期
    if(yue>=M){
      if(riqi>=D){
        this.setData({
          yanzhengyue:yue - M,
          yanzhengri:riqi - D
        })    
      }else if(riqi < D){
                      let a = yue - 1
                      if( a ==1 || a ==3 || a ==5 || a ==7 || a ==8 || a == 10 || a ==12 ){       
                        this.setData({
                          yanzhengyue:a - M,
                          yanzhengri:riqi+31 - D
                        }) 
                      }else if(a ==4 || a ==6 || a ==9 || a ==11 ){
                        this.setData({
                          yanzhengyue:a- M,
                          yanzhengri:riqi+30 - D
                        }) 
                      }else if(a ==2 ){
                        let y = Y/4;
                        if(parseInt(y)==y){
                          this.setData({
                            yanzhengyue:a - M,
                            yanzhengri:riqi+29 - D
                          }) 
                        }else{
                          this.setData({
                            yanzhengyue:a - M,
                            yanzhengri:riqi+28 - D
                          }) 
                        }
                      }
    }}else if(yue<M){
      if(riqi>=D){
        this.setData({
          yanzhengyue:yue+12 - M,
          yanzhengri:riqi - D
        })    
      }else  if(riqi < D){
        let a = yue - 1
        if( a ==1 || a ==3 || a ==5 || a ==7 || a ==8 || a == 10 || a ==12 ){       
          this.setData({
            yanzhengyue:yue+12-1 - M,
            yanzhengri:riqi+31 - D
          }) 
        }else if(a ==4 || a ==6 || a ==9 || a ==11 ){
          this.setData({
            yanzhengyue:yue+12-1 - M,
            yanzhengri:riqi+30 - D
          }) 
        }else if(a ==2 ){
          let y = Y/4;
          if(parseInt(y)==y){
            this.setData({
              yanzhengyue:yue+12-1 - M,
              yanzhengri:riqi+29 - D
            }) 
          }else{
            this.setData({
              yanzhengyue:yue+12-1 - M,
              yanzhengri:riqi+28 - D
            }) 
          }
        }
        
    }}
    
     //判断驾龄
      if(M >= yue){


        this.setData({
          list:res.data,
          jialing: {nain: ( Y  - nian),yue:(M-yue)}
        })
      }else if (M < yue){
        this.setData({
          list:res.data,
          jialing: {nain:(Y-nian -parseInt(1)),yue:(yue+parseInt(12)-M)}
        })    
      }  
      if(res.data.length>0){  
        this.setData({
        yemianqiehuan:false,
        xianshi:true
      })}
       //跳转显示
     else{}
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