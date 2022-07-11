/* 
    中间件，特指业务流程的中间处理环节。
    中间件一般都有输入与输出

    express中间件的调用流程：
    当一个请求达到express的服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理。

    express中间件的格式：
    express中间件本质上就是一个function处理函数，express中间价格式：
    app.get('/', (req, res, next) => {
        next();
    });
    注意：中间件函数的形参列表中，必须包含next参数。而路由处理函数中只包含req和res。

    next函数是实现多个中间件连续调用的关键，它表示把流转关系转交给下一个中间件或路由。

    定义中间件函数：
    const mw = (req, res, next) => {
        console.log('这是一个最简单的中间件函数');
        // 在当前中间件的业务处理完毕后，必须调用next()函数
        // 表示把流转关系转交给下一个中间件或路由
        next();
    }

    定义全局生效的中间件
    客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件
    通过调用app.use(中间件函数)，即可定义一个全局生效的中间件：
    app.use(mw);
    app.use((req, res, next) => { next(); });

    中间件的作用
    多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或res对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

    定义多个全局中间件
    可以是哟ingapp.use()连续定义多个全局中间件。客户端到达服务器之后，会按照中间件定义的先后顺序一次及逆行调用。

    局部生效的中间件：不使用app.use()定义的中间件，叫做局部生效的中间件，如：
    app.get('/', mw, (req, res) => {});

    定义多个局部的中间件：
    app.get('/', mw1, mw2, (req, res) => {});// 逗号分隔
    app.get('/', [mw1, mw2], (req, res) => {});// 数组

    中间件五个使用注意事项
    ① 一定要在路由之前注册中间件
    ② 客户端发送过来的请求，可以连续调用多个中间件进行处理
    ③ 执行完中间件业务代码之后，不要忘记调用next()函数
    ④ 为了防止代码逻辑混乱，调用next()函数后不要再写额外的代码
    ⑤ 连续调用多个中间件时，多个中间件之间，共享req和res对象

    中间件的分类：express官方把常见的中间件用法，分成了五大类：
    ① 应用级别的中间件
        通过app.use(), app.get(), app.post()，绑定到app实例上的中间件，叫做应用级别的中间件
    ② 路由级别的中间件
        绑定到express.Router()实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别，只不过，应用级别中间件是绑定到app实例上，路由级别中间件绑定到router实例上
        router.use((req, res, next) => { next() })
    ③ 错误级别的中间件
        错误级别中间件的作用：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
        格式：错误级别中间件的function处理函数中，必须有4个形参，形参从前往后->(err, req, res, next)
        app.get('/', (req, res) => {
            throw new Error('服务器内部发生了错误')
        });
        app.use((err, res, req, next) => {// 错误级别中间件，捕获了上面路由中发生的错误
            console.log('发生错误', err.message);// 在服务中打印错误信息
            res.send('err'+err.message)// 向客户端响应错误相关内容
        });
    ④ express内置的中间件
        express.static快速托管静态资源的内置中间件，例如：HTML文件、图片、css样式等（无兼容性）
        express.json解析JSON格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
        // 配置解析application/json格式数据的内置中间件
        // app.use(express.json())
        express.urlencoded解析URL-encoded格式的请求体数据（有兼容性，仅在4.16.0+版本中可用）
        // 配置解析application/x-www-form-urlencoded格式数据的内置中间件
        // app.use(express.urlencoded({extended: false}))
    ⑤ 第三方的中间件
        非express官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率
        例如：在express@4.16.0之前的版本中，经常使用body-parse这个第三方中间件，来解析请求体数据。使用步骤如下：
        1. 运行 npm install body-parser 安装中间件
        2. 使用 require 导入中间件 
        // const parser = require('body-parser');
        3. 调用 app.use() 注册使用中间件
        // app.use(parser.urlencoded({extended: false}));
*/
const express = require('express');
const app = express();

// 注意：除了错误级别的中间件，其他的必须在路由之前
// 配置解析json格式的中间件
app.use(express.json());
// 配置解析URL-encoded格式的中间件
app.use(express.urlencoded({extended: false}));

app.post('/user', (req, res) => {
    // 在服务器可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
    // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于undefined
    console.log(req.body);
});

app.post('/book', (req, res) => {
    // 在服务器可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据 json 和 URL-encoded格式
    console.log(req.body);
});

app.listen(80, ()=>{ 
    console.log('server running at http://127.0.0.1'); 
})