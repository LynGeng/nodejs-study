/* 
    在练习中，10编写接口中，存在接口不支持跨域请求问题
    解决接口跨域问题的方案主要有两种：
    ① CORS（主流的解决方案，推荐使用）
    使用cors中间件解决跨域问题，是一个第三方中间件，通过安装和配置cors中间件，可以很方便的解决跨域问题。
    1. 运行 npm install cors 安装中间件
    2. 使用 const cors = require('cors') 导入中间件
    3. 在路由之前调用 app.use(cors()) 配置中间件
    ② JSONP（有缺陷的解决方案：只支持GET请求）


    什么是CORS
    CORS(Cross-Origin Resource Sharing, 跨域资源共享)由一系列HTTP响应头组成，这些HTTP响应头决定浏览器是否组织前端JS代码跨域获取资源。
    浏览器的同源安全策略默认会组织网页“跨域”获取资源。但如果接口服务器配置了CORS相关的HTTP响应头，就可以解除浏览器端的跨域访问限制问题。
    注意：
    CORS主要是在服务器端配置。客户端浏览器无须做任何额外的配置，即可请求开启了CORS的接口。
    CORS在浏览器中有兼容性。只有支持XMLHttpRequest Level2的浏览器，才能正常访问开启了CORS的服务端接口（例如：IE10+, Chorme4+，FireFox3.5+）

    CORS响应头部 - Access-Control-Allow-Origin
    Access-Control-Allow-Origin: <origin> | *
    其中，origin参数的值制定了允许访问该资源的外域URL。
    例如，下面的字段值只允许来自http://itcast.cn的请求：
    res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn');
    如果指定了Access-Control-Allow-Origin字段的值为通配符*，表示允许来自任何域的请求，事例代码如下：
    res.setHeader('Access-Control-Allow-Origin', '*');

    CORS响应头部 - Access-Control-Allow-Headers
    默认情况下，CORS仅支持客户端向服务器发送如下9个请求头：
    Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于text/plain、multipart/form-data、application/-www-form-urlencoded三者之一）
    如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过Access-Control-Allow-Headers对额外的请求头进行声明，否则这次请求会失败！
    // 允许客户端额外向服务器发送Content-Type请求头和x-Custom-Header请求头
    // 注意：多个请求头之间使用英文的逗号进行分割
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-Custom-Header');

    CORS响应头部 - Access-Control-Allow-Methods
    默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。
    如果客户端希望通过PUT、DELETE等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Allow-Methods来指明实际请求所允许使用的HTTP方法。
    // 只允许 POST、GET、DELETE、HEAD请求方法
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD');
    // 允许所有的HTTP请求方法
    res.setHeader('Access-Control-Allow-Methods', '*');

    CORS请求的分类：
    客户端在请求CORS接口时，根据请求方式和请求头的不同，可以将CORS的请求分为两大类，分别是：
    ① 简单请求：
    1. 请求方式为GET、POST、HEAD三者之一；
    2. HTTP头部信息不超过以下几种字段：无自定义头部字段、 Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于text/plain、multipart/form-data、application/-www-form-urlencoded三者之一）
    ② 预检请求：
    1. 请求方式为GET、POST、HEAD之外的请求Mehtod类型
    2. 请求头中包含自定义头部字段
    3. 向服务器发送了 application/json 格式的数据
    在浏览器和服务器正式通信之前，浏览器会先发送OPTION请求进行预检，以获知服务器是否允许该实际请求，所以这一次的OPTION请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真是数据。

    简单请求：客户端与服务器之间只会发生一次请求。
    预检请求：客户端与服务器之间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求。


    JSONP接口
    浏览器端通过<script>标签的src属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做JSONP
    JSONP并不属于真正的Ajax请求，因为它没有使用XMLHttpRequest这个对象。
    JSONP仅支持GET请求，不支持POST、PUT、DELETE等请求。
    创建JSONP接口的注意事项
    如果项目中已经配置CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明JSONP的接口。否则JSONP接口会处理成开启了CORS的接口。示例代码如下：
    app.get('/api/jsonp', (req, res) => {})
    app.use(cors());

    实现jsonp接口的步骤：
    ① 获取客户端发送过来回调函数的名字
    ② 得到要通过 JSONP 形式发送给客户端的数据
    ③ 根据前两步得到的数据，拼接出一个函数调用的字符串
    ④ 把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行
*/

