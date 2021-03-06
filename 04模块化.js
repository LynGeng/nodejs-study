/* 
    模块化：遵守固定的规则，把一个大文件拆成独立互相依赖的多个小模块。
    
    模块化的优点：
    ①提高了代码的复用性
    ②提高了代码的可维护性
    ③可以实现按需加载

    模块化规范：对代码进行模块化拆分与组合时，需要遵守的那些规则。
    如：使用什么样的语法格式来引入模块；在模块中使用什么样的语法格式向外暴露成员。
    模块化规范的好处：降低了沟通成本，极大方便了各个模块之间的相互调用，利人利己。

    Node.js中模块的分类：
    内置模块：由官方提供的，如fs、path、http等。
    自定义模块：用户创建的每个.js文件，都是自定义模块。
    第三方模块：由第三方开发出来的模块，并非官方提供的内置模块，也不是用户自定义模块，使用前需要下载。

    require()加载模块：
    使用强大的require()方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。
    使用require()方法加载其他模块时，会执行被加载模块中的代码。
    使用require()加载用户自定义模块时，可以省略.js后缀

    模块作用域:
    和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域。
    模块作用域优点：防止了全局变量污染的问题。

    module对象：
    在每个.js自定义模块中都有一个module对象，它里面存储了和当前模块有关的信息。

    module.exports对象：
    在自定义模块中，可以使用module.exports对象，将模块内的成员共享出去，供外界使用。
    外界用require()方法导入自定义模块时，得到的就是module.exports所指向的对象。
    可以使用module.exports.username = 'zs'对外暴露属性
    注意：
    使用require()方法导入模块时，导入的结果，永远以module.exports指向的对象为准

    exports对象
    由于module.exports单词写起来比较复杂，为了简化向外共享成员的代码，Node提供了exports对象。默认情况下，exports和module.exports指向同一个对象。最终共享的结果，还是以module.exports指向的对象为准。

    exports和module.exports的使用误区：
    谨记：使用require()方法导入模块时，导入的结果，永远以module.exports指向的对象为准。

    CommonJS模块化规范：
    CommonJS规定了模块的特性和各模块之间如何相互依赖。
    CommonJS规定：
    ①每个模块内部，module变量代表当前模块。
    ②module变量是一个对象，它的exports属性(即module.exports)是对外的接口
    ③加载某个模块，其实是加载该模块的module.exports属性。require()方法用于加载模块
*/