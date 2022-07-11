/* 
    在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供资源的电脑，叫做服务器。
    http模块时Node.js官方提供的、用来创建web服务器的模块。通过http模块提供的http.createServer()方法，就能方便的把一台普通的电脑，变成一台Web服务器，从而对外提供Web资源服务。

    如果希望使用http模块创建Web服务器，则需要先导入它：
    const http = require('http');
    服务器和普通电脑的区别在于，服务器上安装了web服务器软件，例如IIS、Apache等。通过安装这些服务器软件，就能把一台普通的电脑变成一台web服务器。

    创建web服务器的基本步骤
    ①导入http模块
    ②创建web服务器实例
    ③为服务器绑定request事件，监听客户端请求
    ④启动服务器

    根据不同的url响应不同的html内容
    ①获取请求的url地址
    ②设置默认的响应内容为404 not found
    ③判断用户请求是否为 / 或 /index.html 首页
    ④判断用户请求的是否为 /about.html 关于页面
    ⑤设置Content-Type响应头，防止中文乱码
    ⑥使用res.end()把内容响应给客户端
*/
// ①导入http模块
const http = require('http');
// ②创建web服务器实例
const server = http.createServer();
// ③为服务器绑定request事件，监听客户端请求
/* 
    req: 请求对象，只要服务器接收到了客户端的请求，就会调用通过server.on()为服务器绑定的request事件处理函数。
    如果想在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下方式：
    req.url: 是客户端请求的url地址
    req.method: 是客户端的method请求类型

    res: 响应对象，在服务器的request事件处理函数中，如果想访问与服务器相关的数据或属性，可以使用如下方式：
    res.end(something): 向客户端发送指定的内容，并结束这次请求的处理过程

    当调用res.end()方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：
    为了防止中文乱码的问题，需要设置响应头 Content-Type 的值为 text/html;charset=utf-8
*/
server.on('request', (req, res) => {
    // console.log('Someone visit our web server');
    const url = req.url;
    const method = req.method;
    let str = '';
    // str = `Your request url is ${url}, your method is ${method}`;
    // str = `您请求的url是 ${url}, 您请求的方法是 ${method}`;
    switch(url) {
        case '/': 
        case '/index.html' : 
            str = '<h1>我是首页</h1>';
            break;
        case '/about.html':
            str = '<h1>我是关于页面</h1>';
            break;
        default: 
            str = '<h1>404 NOT FOUND</h1>';
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(str);
});
// ④启动服务器
server.listen('80', () => {
    console.log('server running at http://127.0.0.1')
});
