/* 
什么是包
    Node.js中的第三方模块又叫做包。

包的来源
    包是由第三方个人或团队开发出来的，免费供所有人使用
    注意：Node.js中的包都是免费且开源的，不需要付费即可免费下载使用。

为什么需要包：
    由于Node.js的内置模块仅提供了一些底层的API，导致在基于内置模块进行项目开发时，效率很低。
    包是基于内置模块封装出来的，提供了更高级，更方便的API，极大的提高了开发效率。

从哪里下载包：
    搜索包：https://www.npmjs.com/
    下载包：https://registry.npmjs.org/

安装指定版本的包：
    npm i 指定包名 默认下载最新版的包
    npm i 指定包名@指定版本号

包的版本号：
    包的版本号是以“点分十进制”形式定义的，总共有三位数字，例如2.24.0
    每一位数字代表如下：
    第1位数字：大版本（底层重构时+1）
    第2位数字：功能版本（功能新增时+1）
    第3位数字：bug修复版本（修复bug时+1）
    版本号提升规则：只要前面的版本号增长了，则后面的版本号归零

包管理配置文件
    npm规定，在项目根目录中，必须提供一个叫做package.json的包管理配置文件。用来记录与项目有关的一些配置信息。例如：
    项目的名称、版本号、描述等
    项目中都用到了哪些包
    哪些包只在开发期间会用到
    哪些包在开发和部署时都需要用到

多人协作的问题：第三方包是比较大的，在上传代码时需要将其剔除

快速创建package.json
    npm包管理工具提供了一个快捷命令，可以在执行命令时所处的目录中，快速创建package.json这个包管理配置文件：
    npm init -y
    项目名称不要包含中文，空格
    dependencies节点：专门用来记录使用npm install命令安装了哪些包

一次性安装所有包 npm install

卸载包 npm uninstall 指定包名

devDependencies：开发时所需要使用的依赖
    npm i 包名 -D / npm install 包名 --save-dev

解决下包速度慢的问题：淘宝镜像服务器，切换npm的下包镜像源
    查看当前下包的镜像源
    npm config get registry
    设置当前下包的镜像源
    npm config set registry=下包url

nrm
    为了方便的切换下包的镜像源，我们可以安装nrm这个小工具，利用nrm提供的终端命令，可以快速查看和切换下包的镜像源。
    安装：npm i nrm -g
    查看所有可用的镜像源：
    nrm ls
    切换下包镜像源
    nrm use 镜像源

包的分类：
    项目包：被安装到项目的node_modules目录中的包，都是项目包。
    项目包又分为两类：
    开发依赖包（被记录到devDependencies节点中的包，只在开发期间会用到）npm i 包名 -D
    核心依赖包（被记录depencies节点中的包，在开发期间和项目上线之后都会用到）npm i 包名
    全局包：在执行npm install命令时，如果提供了-g参数，则会把包安装为全局包
    全局包会被安装到C:\Users\用户目录\AppData\Roaming\npm\node_modules目录下
    卸载全局包：npm uninstall 包名 -g
    注意：
    ①只有工具性质的包，才有全局安装的必要性。因为他们提供了好用的终端命令。
    ②判断这个包是否需要全局安装后才能使用，可以参考官方提供的使用说明即可。

i5ting_toc
    i5ting_toc是一个可以把md文档转为html页面的小工具，使用步骤如下：
    // 将i5ting_toc安装为全局包
    npm install i5ting_toc -g
    // 调用i5ting_toc，轻松实现md转html的功能
    i5ting_toc -f 要转换的md文件路径 -o

规范的包结构
    ①包必须以单独的目录而存在
    ②包的顶级目录下要必须包含package.json这个包管理配置文件
    ③package.json中必须包含name, version, main这三个属性，分别代表包的名字、版本号、包的入口。


创建自己的包：
    ①首先创建一个文件夹，文件夹目录需要包含三个文件index.js, package.json, README.md
    index.js：包的主入口文件
    package.json：包的配置文件
    README.md：包的说明文件
    ②将不同的功能进行模块化拆分，在index.js文件中导入两个模块，得到需要向外共享的方法
    在index.js中使用module.exports把对应的方法共享出去
    ③编写说明文档：安装方式，导入方式，功能函数使用，开源协议
    ④没有账号则前往官网，注册账号https://www.npmjs.com/，有请忽略
    ⑤在终端登录账号，是在终端，不是网站 
    运行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功
    注意！！！
    运行npm login命令之前，必须先把下包的服务器地址切换为npm的官方服务器。否则会导致发布包失败！
    第一次登录可能会有验证码
    ⑥登录成功后，将终端切换到包的根目录之后，运行npm publish命令，即可将包发布到npm上（注意：包名不能雷同）
    ⑦删除已发布的包
    运行 npm unpublish 包名 --force 命令，即可从npm删除已发布的包
    注意：
    npm unpublish命令只能删除72小时以内发布的包
    npm unpublish删除的包，在24小时内不允许重复发布
    发布包的时候要慎重，尽量不要往npm上发布没有意义的包

*/