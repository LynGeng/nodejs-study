/* 
    自定义中间件
    手动模拟一个类似于express.urlencoded这样的中间件，来解析POST提交到服务器的表单数据。
    实现步骤：
    ① 定义中间件
    ② 监听req的data事件
    如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器。所以data事件可能会触发多次，每一次触发data事件时，湖区的数据知识完整数据的一部分，需要手动对接收的数据进行拼接
    ③ 监听req的end事件
    ④ 使用querystring模块
    nodejs内置了querystring模块，专门用来处理查询字符串。通过这个模块提供的parse()函数，可以轻松把查询字符串，解析成对象的格式。
    ⑤ 将解析出来的数据对象挂载为req.body
    上游的中间件和下游的中间件及路由之间，共享同一份req和res。因此，我们可以将解析出来的数据，挂载为req的自定义属性，命名为req.body，供下游使用。
    ⑥ 将自定义中间件封装为模块
*/

// 导入内置querystring模块
const qs = require('querystring');
// 自定义解析表单数据的中间件
const bodyParser = (req, res, next) => {
    // 定义中间件具体的业务逻辑
    // 1. 定义一个str字符串，专门用来存储客户端发送过来的请求体数据
    let str = '';
    // 2. 监听 req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk;
    });
    // 3. 监听 req 的 end 事件
    req.on('end', () => {
        // 在str中存储的是完整的请求体数据
        // console.log(str);
        // TODO: 把字符串格式的请求体数据，解析成对象格式
        const body = qs.parse(str);
        req.body = body;
        next();
    });
}
// 导出，其他文件引入后使用app.use()注册后即可使用
module.exports = bodyParser;