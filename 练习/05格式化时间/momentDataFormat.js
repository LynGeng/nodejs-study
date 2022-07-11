/* 
    使用第三方模块进行时间格式化
*/
const moment = require('moment');

const dt = moment().format('YYYY-MM-DD HH:mm:ss');

console.log(dt);