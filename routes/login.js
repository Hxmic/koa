const router = require('koa-router')();

router.prefix('/api');

router.post('/login', async (ctx, next) => {
    let ctxBody = ctx.request.body;

    let {username, password} = ctxBody;

    if (username == 'admin' && password == '123456') {
        ctx.body = {
            code: 1000,
            data: {
                username: 'admin',
                password: '123456',
            },
            message: '登录成功'
        }
    } else {
        ctx.body = {
            code: 1001,
            data: {},
            message: '登录失败'
        }
    }
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
  })

module.exports = router;