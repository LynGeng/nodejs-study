/* 
    Express
    官方：exress是基于Node.js平台，快速、开放、极简的Web开发框架。
    通俗：express的作用和node.js内置的http模块类似，是专门用来创建Web服务器的
    本质：就是npm上的第三方包，提供了快捷创建web服务器的便捷方法
    express中文官网：http://www.expressjs.com.cn

    Express的基本使用
    安装：在项目所处的目录中，运行如下的终端命令，即可将express安装的项目中使用
    npm i express@4.17.1

    nodemon: 能够监听项目文件的变动，当代码被修改后，nodemon会自动帮我们重启项目，极大方便了开发和调试。
    安装：npm i nodemon -g
    使用：nodemon app.js 启动项目即可自动监听app.js中的变化，重启项目
*/
// 创建web服务器
// 导入express
const express = require('express');
// 创建web服务器
const app = express();
// 启动web服务器
app.listen(80, () => {
    console.log('server running at http://127.0.0.1');
});

/* 
    监听 GET 请求
    app.get('url', (req, res)=>{})
    第1个参数：客户端请求的URL地址
    第2个参数：请求对应的处理函数
        req：请求对象（包含了请求相关的属性与方法）
        res：响应对象（包含了响应相关的属性与方法）
*/
/* 
    监听 POST 请求
    app.get('url', (req, res)=>{})
    第1个参数：客户端请求的URL地址
    第2个参数：请求对应的处理函数
        req：请求对象（包含了请求相关的属性与方法）
        res：响应对象（包含了响应相关的属性与方法）
*/
/* 
    把内容响应给客户端
    res.send()方法，可以把处理好的内容，发送给客户端

    获取URL中携带的查询参数
    req.query对象，可以访问客户端通过查询字符串的形式，发送到服务器的参数
    默认是一个空对象
    客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数
    可以通过req.query对象访问到，如req.query.name, req.query.age

    获取URL中的动态参数
    req.params对象，可以访问到URL中，通过:匹配到的动态参数:
*/
app.get('/', (req, res) => {
    console.log('method:', req.method, ', url:', req.url);
    console.log('req.query: ', req.query);
    // res.send('<h1>hello express</h1>');
    res.send(req.query);
})
// 传入两个动态参数时，传少了就报错
app.get('/user/:id/:name', (req, res) => {
    console.log('method:', req.method, ', url:', req.url);
    console.log('req.params: ', req.params);
    // res.send('<h1>hello express</h1>');
    res.send(req.params);
})

app.post('/', (req, res) => {
    console.log('method: ',req.method, 'url: ',req.url);
    res.end('<h1>hello express</h1>');
})

/* 
    托管静态资源
    express.static()
    express提供了一个非常好用的函数，叫做express.static()，通过它，我们可以非常方便的创建一个静态资源服务器，
    例如，通过如下代码就可以将public目录下的图片、css文件、js文件对外开放访问了：
    app.use(express.static('public'))
    现在就可以访问public目录中的所有文件了：
    http://localhost:3000/images/bg.jpg
    http://localhost:3000/css/index.css
    http://localhost:3000/js/index.js
    注意：express在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在URL中。

    托管多个静态资源目录，多次使用app.use(express.static(''))即可
    访问静态资源文件时，express.static()函数会根据目录的添加顺序查找所需的文件

    挂载路径前缀
    如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下方式：
    app.use('public', express.static('public'))
    http://localhost:3000/public/images/bg.jpg
    http://localhost:3000/public/css/index.css
    http://localhost:3000/public/js/index.js
*/
app.use(express.static('./练习/时钟/clock'))
