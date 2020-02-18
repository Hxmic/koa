const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// socketio

const Router = require('koa-router');
const fs = require('fs');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// mongoose

const mongoose = require('mongoose');
const dbCOnfig = require('./app/dbs/config')

// 路由的引入
const login = require('./app/controllers/login');
const users = require('./app/controllers/user');


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
app.use(login.routes(), login.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// 连接数据库
mongoose.connect(dbCOnfig.dbs, 
	{useNewUrlParser: true, useUnifiedTopology: true}, 
	function(err) {
		if (err) {
			console.log('Connection Error' + err);
		} else {
			console.log('Connection success');
		}
	}
)


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
