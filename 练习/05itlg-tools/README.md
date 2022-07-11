## 安装
```
npm i itlg-tools
```

## 导入
```js
const itlg = require('itlg-tools')
```

## 格式化时间
```js
// 调用dateFormat对时间进行格式化
const dtStr = itlg.dataFormat(new Date())
// 结果 2022-07-04 17:20:00
console.log(dtStr);
```

## 转义HTML中特殊字符
```js
// 调用htmlEscape对html进行转义
const str = itlg.htmlEscape('<h1>hello npm</h1>')
// 结果 &lt;h1&gt;hello npm&lt;/h1&gt;
console.log(str)
```

## 对转义的html进行还原
```js
// 调用htmlUnEscape对转义的html进行还原
const html = itlg.htmlUnEscape('&lt;h1&gt;hello npm&lt;/h1&gt;')
// 结果 <h1>hello npm</h1>
console.log(html)
```

## 开源协议
ISC