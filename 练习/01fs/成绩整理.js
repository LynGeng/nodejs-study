const fs = require('fs');

fs.readFile('成绩.txt', 'utf8', function(err, dataStr) {
    if(err) return console.log(err.message);
    let scores = dataStr.split(' ');
    let newScores = [];
    scores.forEach(item => {
        item = item.replace('=', ':');
        item+='\n';
        newScores.push(item);
    });
    fs.writeFile('成绩-ok.txt', newScores.join(''),function(err) {
        if(err) return console.log(err.message);
        console.log('写入成功');
    });
});