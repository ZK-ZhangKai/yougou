import {
  request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';


// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false
  },
  TimeId:-1,

  handleInput(e){
    const {value}=e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false,
        inpValue:""
      })
      return;
    }
    this.setData({isFocus:true})
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },
  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods:res
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  },
})