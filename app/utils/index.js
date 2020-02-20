const url = require('url');
const jwt = require('jsonwebtoken');

// get 请求把参数改成可以通过query方式获取的
async function getPath(reqUrl) {
    let path = url.parse(reqUrl, true);
    let query = path.query;
    return query;
}

async function setToken(userinfo) {
    const serect = 'koa-token';

    let {username, password} = userinfo;

    const token = jwt.sign({
        username,
        password
    }, serect, {expiresIn: '1h'});

    return token;
}


module.exports = {getPath, setToken};