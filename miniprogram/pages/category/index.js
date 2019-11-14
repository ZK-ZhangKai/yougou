// pages/category/index.js
import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightMenuList: [],
    //接口的返回数值
    Cates: [],
    //被点击的左侧的菜单
    currentIndex: 0,
    //右侧内容的滚动条距离
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先判断一下本地存储中有没有旧的数据
    //没有旧数据 直接发起新请求
    //有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可

    //1.获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    //2.判断
    if (!Cates) {
      //不存在 发送请求数据
      this.getCates();
    } else {
      //有旧的数据  定义过期时间
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送请求
        this.getCates();
      } else {
        //可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
  //获取分类数据
  async getCates() {
    // request({
    //     url: "/categories"
    //   })
    //   .then(res => {
    //     this.Cates = res.data.message;

    //     //把接口的数据存入到本地存储中
    //     wx.setStorageSync("cates", {
    //       time: Date.now(),
    //       data: this.Cates
    //     });

    //     //构造左侧的菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     //构造右侧的商品数据
    //     let rightMenuList = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightMenuList
    //     })
    //   })

    const res = await request({
      url: "/categories"
    })
    this.Cates = res;
    //把接口的数据存入到本地存储中
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    });
    //构造左侧的菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧的商品数据
    let rightMenuList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;

    let rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList,
      //重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })
  }
})