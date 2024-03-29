// pages/cart/index.js
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    this.setData({
      address
    });
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
 //点击支付
 handleOrderPay(){
  //  const token=wx.getStorageSync("token");
  //  if(!token){
  //    wx.navigateTo({
  //      url: '/pages/auth/index'
  //    });
  //    return;
  //  }
  wx.showToast({
    title: '支付成功'
  });
 },
})