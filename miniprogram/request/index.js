  //同时发送异步代码的次数
  let ajaxTimes=0;
export const request=(params)=>{
  ajaxTimes++;
  //显示加载中
  wx.showLoading({
    title: "加载中",
    mask: true,
  });

  //定义公共的url
  const baseUrl="http://api.zbztb.cn/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
        //关闭正在等待的图标
          wx.hideLoading();
        }
      }
    });
  })
}