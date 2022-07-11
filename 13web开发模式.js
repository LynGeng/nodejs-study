/* 
    目前有两种主流的web开发模式：
    ① 服务端渲染
        优点：
        1. 前端耗时少。因为服务器负责动态生成HTML内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
        2. 有利于SEO。因为服务器端响应是完成的HTML内容，所以爬虫更容易获取信息，更有利于SEO。
        缺点：
        1. 占用服务器端资源。即服务器端完成HTML页面内容的拼接，如果请求过多，会对服务器造成一定的访问压力。
        2. 不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，对于前端复杂度高的项目，不利于高效开发。
    ② 前后端分离
        优点：
        1. 开发体验好。前端专注于UI页面开发，后端专注于api的开发，且前端有更多选择性。
        2. 用户体验好。Ajax技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
        3. 减轻了服务器端的渲染压力。因为页面最终在每个用户的浏览器中生成。
        缺点：
        1. 不利于SEO。因为完整的HTML页面需要在客户端动态拼接完成，所以爬虫无法爬取页面的有效信息。（解决方案：利用Vue、React等前端框架的SSR（server side render）技术能够很好的解决SEO问题）

        如何选择Web开发模式：
        服务器端渲染：交互性弱，需要好的SEO的，渲染快的
            企业级网站
        前后端分离：交互性强的
            后台管理项目

        
    身份认证，又称身份验证、鉴权，是指通过一定的手段，完成对用户身份的确认。

    服务端渲染推荐使用Session认证机制
    前后端分离推荐使用JWT认证机制

*/

