// 客户端订阅消息推送

const publicVapidKey = "BPpUEWcmo9QPnhqqKSy314YXM7T1Y0FqEGhUFQT6eN4u9CVQ-yw5PFiyEXqRpi7Qamnp5cJli7gDr4w-O7fu6iA";

// 检查浏览器是否支持service worker
if("serviceWorker" in navigator){
    send().catch(err => console.log(err));
}

// 创建send函数，实现service worker的注册，注册推送，发送推送
async function send(){
    // 注册service worker
    console.log("正在注册service worker...");
    const register = await navigator.serviceWorker.register('/service-worker.js', {
        scope:'/'
    });
    console.log("service worker 注册成功...");

    // 注册推送
    console.log("正在注册推送...");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    })
    console.log("推送注册成功...");

    // 发送推送通知
    console.log("正在推送通知....")
    await fetch('/subscribe', {
        method:"POST",
        body:JSON.stringify(subscription),
        headers:{
            "content-type":"application/json"
        }
    });
    console.log("发送推送通知...")
}

// 数据转化
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }