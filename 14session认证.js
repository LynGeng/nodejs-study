/* 
    session中间件的使用
    ① 安装 npm i express-session
    ② 导入session中间件 const session = require('express-session');
    ② 通过 app.use()来注册session中间件]

    当express-session中间件配置成功后，即可通过req.session来访问和使用session对象，从而存储用户的关键信息
*/

const express = require('express');
const app = express();

// 导入
const session = require('express-session');

// 注册
app.use(session({
    secret: 'itlg',
    resave: false,
    saveUninitialized: true
}));

app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否正确
    if(req.body.username !== 'admin' || req.body.password !=='qweqwe') {
        return res.send({status: 1, msg: '登录失败'});
    }
    req.session.user = req.body;
    req.session.islogin = true;
    res.send({status: 0, msg: '登录成功'});
});

app.get('/api/username', (req, res) => {
    if(!req.session.islogin) {
        return res.send({status: 1, msg: '用户未登录，获取失败'});
    }
    res.send({status: 0, msg: '请求成功', data: {'username': req.session.user.username}});
});

app.post('/api/logout', (req, res) => {
    // 清空当前客户端对应的session信息
    req.session.destroy();// 只会清空当前用户的session，不会清空其他用户的session
    res.send({
        status: 0,
        msg: '退出登录成功'
    });
});

app.listen(80, ()=>{ 
    console.log('server running at http://127.0.0.1'); 
})