import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics,
      }
    })
  },

  //点击轮播图放大预览
  handlePrevewImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  //点击加入购物车
  handleCartAdd(){
    //获取缓存中的购物车 
    let cart=wx.getStorageSync("cart")||[];
    //console.log(cart)
    //判断 商品对象是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    //console.log(index)
    if(index===-1){
      //不存在
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      //已存在  num++
      cart[index].num++;
    }
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true,
    })
  },
})