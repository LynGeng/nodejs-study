/* 
    fs文件系统模块
    fs模块是Node.js官方提供的、用来操作文件的模块。他提供了一系列的方法和属性，用来满足用户对文件的操作需求

    fs.readFile()方法，用来读取指定文件的内容
    fs.writeFile()方法，用来向指定的文件中写入内容

    想要使用fs模块，需要先导入
    const fs = require('fs');
*/

const fs = require('fs');
/* 
    fs.readFile(path[, options], callback);
    读取指定文件中的内容
    参数1：必选参数，字符串，表示文件的路径
    参数2：可选参数，表示以什么编码格式来读取文件
    参数3：必选参数，文件读取完后，通过回调函数拿到读取的结果 err dataStr
*/
fs.readFile('./files/test.txt', 'utf8', function(err, dataStr) {
    // 读取成功 - err为null，dataStr为文件每一行内容
    // 读取失败 - err为错误对象，dataStr为undefined
    // 读取后datastr 为字符串类型
    if(err) return console.log(err.message);
    console.log('文件内容是');
    for(let i = 0; i< dataStr.length; i++) {
        // if() {
        console.log(dataStr[i]);
        console.log(dataStr[i].trim() == true);
        console.log('----------')
    }
});
/* 
    fs.writeFile(file, data[, options], callback);
    向指定文件中写入内容
    参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
    参数2：必选参数，表示要写入的内容
    参数3：可选参数，表示以什么格式写入文件内容，默认值是utf8
    参数4：必选参数：文件写入完成后的回调函数
    文件要是不存在会，直接创建
    写入内容的形式是直接覆盖
    // 创建不了文件夹
*/
/* fs.writeFile('./files/test.js','// hello nodejs',function(err) {
    // 写入成功-err为null
    // 写入失败-err为错误对象
    if(err) return console.log(err.message); 
    console.log('写入成功');
}); */

/* 
    路径动态拼接的问题
    在使用fs模块操作文件时，如果提供的操作路径是以./或../开头的相对路径时，很容易出现路径动态拼接错误的问题
    原因：代码在运行的时候，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径

    __dirname: 表示当前文件所处的目录
*/
fs.writeFile(__dirname+'/files/test.js','// hello nodejs',function(err) {
    // 写入成功-err为null
    // 写入失败-err为错误对象
    if(err) return console.log(err.message); 
    console.log('写入成功');
});

