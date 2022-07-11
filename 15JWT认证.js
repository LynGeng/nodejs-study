/* 
    跨域认证问题的最流行解决方案。
    JWT通常由三部分组成，分别是Header（头部）、Paylaod（有效荷载）、Signature（签名）
    三者之间使用英文的“.”，格式如下：
    Header.Paylaod.Signature

    Payload部分才是真正的用户i西南西，它是用户信息经过加密之后生成的字符串。
    Header和Signature是安全性相关的部分，只是为了保证Token的安全性。

    JWT使用方式
    客户端收到服务器返回的JWT之后，通常会将它存储在localStorage或sessionStorage中。
    客户端每次与服务器通信，都要带上这个JWT的字符串，从而进行身份认证。
    推荐的做法是把JWT放在HTTP请求头的Authorization，格式如下：
    Authorization: Bearer <token>
    要手动添加Bearer在token前面 不然会解析失败

    express中使用JWT
    ① 安装JWT相关的包 npm i jsonwebtoken express-jwt
    jsonwebtoken用于生成JWT字符串
    express-jwt用户将JWT字符串解析还原成JSON对象
    ② 导入相关的包
    const jwt = require('jsonwebtoken');
    cosnt expressJWT = require('express-jwt');
    ③ 定义secret密钥：为了保证JWT字符串的安全性，防止JWT字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的secret密钥
    secret密钥本质就是一个字符串：const secretKey = 'itlg';
    ④ 登录成功可以使用jwt.sign()方法来生成token返回给客户端
    ⑤ 客户端请求数据时，可以使用expressJWT注册全局中间件来解析token
    当express-jwt这个中间件配置成功之后，即可在那些有权限的接口中，使用req.user对象，来访问JWT字符串中解析出来的用户信息了。

    捕获JWT失败后产生的错误

*/

const express = require('express');
const app = express();

// 导入生成和解析JWT包
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

// 允许跨域资源共享
const cors = require('cors');
app.use(cors());

// 解析post表单数据的中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// 定义secret密钥
const secretKey = 'lg add oil -.-';

// 注册全局中间件解析token，排除带有/api/的接口
app.use(expressJWT({secret: secretKey}).unless({path: [/^\/api\//]}))

// 登录接口
app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否正确
    if(req.body.username !== 'admin' || req.body.password !=='qweqwe') {
        return res.send({status: 1, msg: '登录失败'});
    }
    const userinfo = req.body;
    res.send({
        status: 200, 
        msg: '登录成功',
        // jwt.sign()参数1：用户信息对象，参数2：secret密钥，参数3：token有效期
        token: jwt.sign({username: userinfo.username}, secretKey, {expiresIn: '30s'})
    });
});

app.get('/admin/getInfo', (req, res) => {
    console.log(req.user);
    res.send({
        status: 200, 
        msg: '登录成功',
        data: req.user
    });
});

app.use((err, req, res, next) => {
    // token解析失败导致的错误
    if(err.name === 'UnauthorizedError') {
        return res.send({status: 401, message: '无效的token'});
    }
    // 其他原因的错误
    res.send({status: 500, message: err.message});
})

app.listen(80, ()=>{ 
    console.log('server running at http://127.0.0.1'); 
})