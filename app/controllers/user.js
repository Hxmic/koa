const router = require('koa-router')();
const UserInfo = require('../dbs/models/userinfo');
const {getPath, setToken} = require('../utils/index');

router.prefix('/api');

router.post('/login', async (ctx, next) => {
    let {username, password} = ctx.request.body;    
    // const userinfo = new UserInfo({
    //     username,
    //     password,
    // })

    
    let code = 1001, data = {}, msg = 'fail';
    let isName = await UserInfo.findOne({'username': username});
    let isPwd = await UserInfo.findOne({'password': password});

    if (isName && isPwd) {
        let token = await setToken(ctx.request.body);

        UserInfo.updateOne({'name': username}, {$set:{'token': 'asdfsadfsadfsadf'}}, (err, _d) => {
            console.log(err)
            console.log(_d)
        })
        
        code = 1000;
        msg = 'success';
        
    } else if (isName) {
        code = 1001;
        msg = '密码错误';
    } else if (isPwd) {
        code = 1001;
        msg = '账号不存在';
    }

    ctx.body = {
        code,
        data,
        msg,
    }
});

router.get('/user', async (ctx, next) => {
    let query = await getPath(ctx.request.url);
    let userInfo = await UserInfo.findOne({'username': query.username});

    ctx.body = {
        code: 1000,
        data: userInfo
    }
})

module.exports = router;