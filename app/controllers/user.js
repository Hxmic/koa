const router = require('koa-router')();

//要操作数据库了，之前我们在models里面根据描述创建了模型
//现在根据模型我们实例化一个表出来
//那我们需要在这个接口文件中，引进我们创建的模型,就是person文件啦
//再说一遍，schema描述表的字段，moudle里面有增删改查的操作

const Person = require('../dbs/models/person');

router.prefix('/users');

router.get(`/`, async (ctx, next) => {

    ctx.body = {
        code: 1000,
        data: {
            name: '测试'
        },
        msg: 'success',
    }
    
})

// 提交数据
router.post('/addPerson', async (ctx) => {
    let {name, age} = ctx.request.body;
    const person = new Person({
        name,
        age
    });

    let code = 1001;
    try {
        await person.save();
        code = 1000;
    } catch(error) {
        code = 1001;
    }

    ctx.body = {
        data: {},
        code,
        msg: '添加成功',
    }
})

// 查询全部数据
router.get('/getPerson', async (ctx) => {
    console.log(Person.find())
    const results = await Person.find({})
    ctx.body = {
        code:0,
        results
    }
})

module.exports = router;