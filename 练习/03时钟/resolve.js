/* 
    将index.html文件拆分为三个文件并放入clock文件夹中
*/
// 引入需要使用的api
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
// 匹配的正则表达式 \s表示空白字符 \S表示非空白字符 *表示任意次
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 处理HTML
fs.readFile(path.join(__dirname,'./index.html'), 'utf-8', function(err, dataStr){
    if(err) return console.log(err.message);
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
});

function resolveCSS(htmlStr) {
    const r1 = regStyle.exec(htmlStr);
    if(!r1) return console.log('正则匹配失败~');
    const newCSS = r1[0].replace('<style>', '').replace('</style>', '');
    fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, function(err) {
        if(err) return console.log(err.message);
        console.log('css写入成功');
    });
}


function resolveJS(htmlStr) {
    const r2 = regScript.exec(htmlStr);
    if(!r2) return console.log('正则匹配失败~');
    const newScript = r2[0].replace('<script>', '').replace('</script>', '');
    fs.writeFile(path.join(__dirname, './clock/index.js'), newScript, function(err) {
        if(err) return console.log(err.message);
        console.log('js写入成功');
    });
}

function resolveHTML(htmlStr) {
    const newHTML = htmlStr
    .replace(regStyle, '<link rel="stylesheet" href="./index.css"/>')
    .replace(regScript, '<script src="./index.js"></script>');
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err) {
        if(err) return console.log(err.message);
        console.log('html写入成功');
    });
}

