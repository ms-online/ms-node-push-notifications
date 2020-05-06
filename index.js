// 引入模块
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// 设置静态目录
app.use(express.static(path.join(__dirname,"client")));

// 请求体解析中间件
app.use(bodyParser.json());

// 应用服务器密钥
const publicVapidKey = "BPpUEWcmo9QPnhqqKSy314YXM7T1Y0FqEGhUFQT6eN4u9CVQ-yw5PFiyEXqRpi7Qamnp5cJli7gDr4w-O7fu6iA";
const privateVapidKey = "6VkOtDwPSFPQ6UmNKphfDXMXdjQqwKCJLffXo4BRthY";

// 设置vaipd
webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
)

// 服务端推送消息
app.post('/subscribe',(req,res) => {
    const subscription = req.body;

    // 设置发送状态码201
    res.status(201).json({});

    // 创建payload
    const payload = JSON.stringify({
        title:"推送测试"
    });

    // 发送推送通知
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
})

// 定义端口号
const Port = 4000;

// 监听端口号
app.listen(Port, () => console.log(`服务器已经在${Port}端口号运行...`))