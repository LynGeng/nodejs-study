/* 
    path模块时Nodejs官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。
    path.join()方法，用来将多个路径拼接成一个完整的路径字符
    path.basename()方法，用来从路径字符串中，将文件名解析出来
    如果要在js代码中，使用path模块来处理路径，需要引入：
    const path = require('path');
*/
const path = require('path');
/* 
    path.join([...paths])
    可以把多个路径片段拼接为完整的路径字符串
    参数可以是多个字符串路径
*/
// '../'会将之前的路径抵消一次
const pathStr = path.join('/a', '/b/c', '../', './d', 'e');// \a\b\d\e
console.log(pathStr);
const pathStr2 = path.join(__dirname, './files/test.txt');
console.log(pathStr2);
// 注意：今后凡是涉及到路径拼接的操作，都要使用path.join()方法进行拼接，不要使用+拼接
const fs = require('fs');
fs.readFile(path.join(__dirname, './files/test.txt'),'utf8',function(err, dataStr) {
    // 写入成功-err为null
    // 写入失败-err为错误对象
    if(err) return console.log(err.message); 
    console.log(dataStr);
});

/* 
    path.basename(path[, ext])
    可以获取路径中的最后一部分，通常通过这个方法获取路径的文件名
    path<string>必选参数，表示一个路径字符串
    ext<string>可选参数，表示文件扩展名
    返回<string>表示路径中的最后一部分
*/
const fpath = '/a/b/c/index.html'; // 文件的存放路径
let fullName = path.basename(fpath);
console.log(fullName);// index.html
let nameWithoutExt = path.basename(fpath, '.html');// 传入.html会将文件扩展名删除
console.log(nameWithoutExt);// index

/* 
    path.extname(path)
    path<string>必选参数，表示也给路径的字符串
    返回：<string>返回得到扩展名字符串
*/
const extName = path.extname(fpath);
console.log(extName);//.html