//引入永爱发送请求的方法
import {request} from "../../request/index.js";
wx.cloud.init();
const db = wx.cloud.database();
wx - Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [], //轮播图数组
    catesList: [], //导航数组
    floorList: [], //楼层数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //轮播图
    db.collection("sc_swiper")
      .get()
      .then(res => {
        //console.log(res)
        this.setData({
          swiperList: res.data
        })
      })
      .catch(),
      //导航栏
      db.collection("catesList")
      .get()
      .then(res => {
        //console.log(res)
        this.setData({
          catesList: res.data
        })
      })
      .catch()
    //楼层
    wx.request({
      url: 'http://api.zbztb.cn/api/public/v1/home/floordata',
      success:(result)=>{
        //console.log(result)
        this.setData({
          floorList:result.data.message
        })
      }
    })
    // request({
    //   url:"http://api.zbztb.cn/api/public/v1/home/floordata"
    //   .then(result=>{
    //     this.setData({
    //       floorList:result.data.message
    //     })
    //   })
    // })

    
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