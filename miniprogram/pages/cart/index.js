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
    allchecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({address});
    this.setCart(cart);
  },

  //点击收货地址
  async handleChooseAddress() {
    try {
      //获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      //判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },

  //商品选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },

  //设置购物车状态同时重新计算 数据 全选 总价 数量
  setCart(cart) {
    let allchecked = true;
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allchecked = false;
      }
    });
    //判断数组是否为空
    allchecked = cart.length != 0 ? allchecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allchecked
    });
    wx.setStorageSync("cart", cart);
  },

  //商品全选功能
  handleItemAllChange(){
    let {cart,allchecked}=this.data;
    allchecked=!allchecked;
    cart.forEach(v=>v.checked=allchecked);
    this.setCart(cart);
  },
  //商品数量的编辑功能
 async handleItemNumEdit(e){

    const {operation,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      const res=await showModal({content:"您是否要删除"});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      cart[index].num+=operation;
      this.setCart(cart);
    }
  },

  //点击结算
 async handlePay(){
    //判断收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    //判断用户是否有选择商品
    if(totalNum==0){
      await showToast({title:"您还没有选购商品"})
      return;
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})