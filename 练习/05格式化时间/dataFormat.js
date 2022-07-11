/* 
    自定义格式化时间模块
*/

// 自定义事件的方法
function dataFormat(dtStr) {
    const dt = new Date(dtStr);

    const y = dt.getFullYear();
    const m = padZero(dt.getMonth()+1);
    const d = padZero(dt.getDay());

    const hh = padZero(dt.getHours());
    const mm = padZero(dt.getMinutes());
    const ss = padZero(dt.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

// 定义补零的函数
function padZero(n) {
    return n > 9 ? n : '0'+n;
}

module.exports.dataFormat = dataFormat;