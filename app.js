const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const Router = require('koa-router');
const fs = require('fs');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);


// 首页路由
let router = new Router();
router.get('/home', ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./index.html');
});

// socket连接
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: '+msg);
      io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

app.use(router.routes());

// const index = require('./routes/index')
// const users = require('./routes/users')
// const login = require('./routes/login')

const login = require('./app/controllers/login')
const test = require('./app/controllers/test')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  ctx.set('Content-Type','application/x-www-form-urlencoded')
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// app.use(login.routes(), login.allowedMethods())

app.use(login.routes(), login.allowedMethods());
app.use(test.routes(), test.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
