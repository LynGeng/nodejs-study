/* 
    将clock中的文件放入web服务器中，给客户端使用
    核心思路：把文件的实际存放路径，作为每个资源的请求url地址

    实现步骤
    ①导入需要的模块
    ②创建基本的web服务器
    ③将资源的请求url地址映射为文件的存放路径
    ④读取文件内容并响应给客户端
    ⑤优化资源的请求路径
*/
// 导入所需使用的模块
const fs = require('fs');
const path = require('path');
const http = require('http');

// 创建服务器，监听request事件，运行服务器
const server = http.createServer();
server.on('request', (req, res) => {
    // 获取到客户端请求的 url 地址
    const url = req.url;
    // 将请求的url地址映射为具体文件的存放路径
    // let fpath = path.join(__dirname, url);
    let fpath = '';
    if(url == '/') {
        fpath = path.join(__dirname, './clock/index.html');
    } else if(!url.includes('clock')) {
        fpath = path.join(__dirname, '/clock', url);
    } else {
        fpath = path.join(__dirname, url);
    }
    // 根据映射路径读取文件内容
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        if(err) return res.end('<h1>404 NOT FOUND</h1>');
        res.end(dataStr);
    });
});
server.listen('80', () => {
    console.log('server running at http:/127.0.0.1');
});