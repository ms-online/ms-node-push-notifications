console.log("service worker 加载中...")

// 事件监听
self.addEventListener('push', e => {
    const data = e.data.json();
    console.log("推送通知已收到...");
    self.registration.showNotification(data.title, {
        body:"来自米修在线的推送通知..."
    })
});