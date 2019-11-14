// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "全部订单",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "代发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
  },

  onShow: function (options) {
    let pages=getCurrentPages();
    let ccurrentPage=pages[pages.length-1];
    console.log(ccurrentPage.options)
    this.getOrders();
  },
  //获取订单列表的方法
  async getOrders(type){
    const res=await request({url:"/my/orders/all",data:type});
  },
  //标题点击事件
  handleTabsItemChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },


})