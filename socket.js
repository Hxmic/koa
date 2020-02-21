const Koa = require('koa');
const app = new Koa();//实例化
// const Router = require('koa-router'); //注意：引入的方式
// const bodyParser = require('koa-bodyparser');//处理post请求
// const cors = require('koa2-cors');// CORS是一个W3C标准，全称是"跨域资源共享"
// const { connect, initSchemas } = require("./mongodb");
// const mongoose = require('mongoose');

//核心，初始化app作为HTTP 服务器的回调函数像express这么写mac电脑会有问题，无法访问
// const server = require('http').Server(app);  //express写法
const server = require('http').Server(app.callback());  //koa正确姿势

const io = require('socket.io')(server); //核心，实现客户端之间交互通信


let sum = 0;
io.on('connection', socket => {
    console.log('初始化成功！');
    // const Message = mongoose.model('Message')
    // Message.find({}, function (err, res) {
    //     io.emit('getMsg', res);
    // })
    //新人进来在线人数+1
    socket.on('users',data=>{
        sum = sum + 1;
        io.emit('users',sum); //将消息发送给所有人。
    })
    //disconnnect断开,自带函数方法
    socket.on('disconnect',data=>{
        console.log('用户断开了');
        sum = sum - 1;
        io.emit('users',sum); //将消息发送给所有人。
    })
    socket.on('send', data => {
        // console.log('客户端发送的内容：',data, data['name'], data['getMsg']);
        // console.log('获取到数据', 12)
        // socket.emit('getMsg', 1); //通知触发该方法的客户端
        io.emit('getMsg', data); //通知所有客户端
        // try {
        //     // const Message = mongoose.model('Message')
        //     // let oneUser = new Message({ name: data['name'], msg: data['getMsg'] })
        //     // oneUser.save().then(() => {
        //         // const Message = mongoose.model('Message')
        //         // let dataArry = Message.find({}, function (err, res) {
        //             console.log('获取到数据', 12)
        //             socket.emit('getMsg', 1); //通知触发该方法的客户端
        //             io.emit('getMsg', 2); //通知所有客户端
        //         // })
        //     // })
        // } catch (error) {
        //     console.log("失败",error)
        // }
    })
})

server.listen(22222, () => {
    console.log(`监听地址: http://127.0.0.1:22222`);
})