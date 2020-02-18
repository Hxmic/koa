const router = require('koa-router')();
router.prefix('/api');

router.get(`/userInfo`, async (ctx, next) => {
    let ctxBody = ctx.request.body;

    let {guid} = 'admin';

    ctx.body = {
        code: 1000,
        data: {
            user: 'niu',
            age: 10
        },
        msg: 'success',
    }
    
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router;
