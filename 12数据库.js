/* 
    数据库是用来组织、存储和管理数据的仓库。

    常见的数据库：
    MySQL数据库（目前使用最广泛、流行度最高的开源免费数据库；Community+Enterprise）
    Oracle数据库（收费）
    SQL Server数据库（收费）
    Mongodb数据库（Community+Enterprise）

    MySQL、Oracle、SQL Server属于传统型数据库，（又叫关系型数据库或SQL数据库），这三者的设计理念相同，用法比较类似
    Mongodb属于新型数据库（又叫：非关系型数据库或NoSQL数据库），它在一定程度上弥补了传统型数据库的缺陷。

    SQL语句：
    从FROM指定的【表中】，查询出【所有的】数据，*表示【所有的】
    select * from 表名称
    从FROM指定的【表中】，查询出指定列名称（字段）的数据
    select 列名称 from 表名称

    insert into 语句用于向数据表中插入新的数据行，语法格式如下
    insert into table_name(列1，列2，...) values (值1，值2，...)

    用update指定要更新哪个表中的数据
    用set指定列对应的新值
    用where指定更新的条件
    update 表名称 set 列名称 = 新值 where 列名称 = 某值

    从指定表中，根据WHERE条件，删除对应的数据行
    delete from 表名称 where 列名称 = 值

    where子句中的运算符
    <> 不等于
    like 模糊
    between 在一定范围内

    and 必须满足多个条件
    or 满足多个条件中的一个

    order by语句 根据指定的列对结果集进行排序
    默认按照升序对记录进行排序
    降序的话 可以使用 desc 关键字
    升序关键字 asc

    count(*) 函数
    count(*)函数用于返回查询结果的总数据条数
    select count(*) from 表名称

    使用as为列设置别名
    select count(*) as total from users where status = 0

    在项目中操作数据库
    ① 安装操作MySQL数据库的第三方模块（mysql）
    npm i mysql
    ② 通过mysql模块连接到MySQL数据库
    ③ 通过mysql模块执行SQL语句
*/

// 导入mysql模块
const mysql = require('mysql');

// 建立与数据库的连接池
const db = mysql.createPool({
    host: '127.0.0.1',// 数据库的IP地址
    user: 'root', // 登录数据库的账号
    password: '5244', // 登录数据库的密码
    database: 'my_db_01' // 指定要操作的数据库名称
});

// 调用 db.query() 函数，指定要执行的SQL语句，通过回调函数拿执行的结果：
/* db.query('select 1', (err, res) => {
    if(err) return console.log(err.message);
    // 只要能打印出[RowDataPacket {'1' : 1}]的结果，就证明数据库连接正常
    console.log(res);
}); */

// 查询
/* const select = 'select * from users';
db.query(select, (err, res) => {
    if(err) return console.log(err.message);
    // select 执行的结果是数组
    console.log(res);
}); */

// 插入
// const user = {username: 'spider_man', password: '1231231'};
/* const insert = 'insert into users (username, password) values (?, ?)';
db.query(insert, [user.username, user.password], (err, res) => {
    if(err) return console.log(err.message);
    // insert into 执行的结果是对象
    if(res.affectedRows === 1) console.log('插入数据成功');
}); */
// 当插入数据中key值和数据库字段名相同时可以简便插入
/* const insert = 'insert into users set ?';
db.query(insert, user, (err, res) => {
    if(err) return console.log(err.message);
    // insert into 执行的结果是对象
    if(res.affectedRows === 1) console.log('插入数据成功');
}); */

// 更新
// const user = {id: 8, username: 'aaaaa', password: 'aaa'};
/* const update = 'update users set username=?, password=? where id=?';
db.query(update, [user.username, user.password, user.id], (err, res) => {
    if(err) return console.log(err.message);
    // update 执行的结果是对象
    if(res.affectedRows === 1) console.log('更新数据成功');
}); */
// 简便方式
/* const update = 'update users set ? where id=?';
db.query(update, [user, user.id], (err, res) => {
    if(err) return console.log(err.message);
    // insert into 执行的结果是对象
    if(res.affectedRows === 1) console.log('更新数据成功');
}); */

// 删除
/* const del = 'delete from users where id = ?';
db.query(del, 8, (err, res) => {
    if(err) return console.log(err.message);
    // delete 执行的结果是对象
    if(res.affectedRows === 1) console.log('删除数据成功');
}); */


/* 
    标记删除
    当用户使用delete语句，会真正把数据从表中删除掉，为了保险起见，推荐使用标记删除，来模拟删除操作
    所谓的标记删除，就是在表中设置类似于status这样的状态字段，标记这条数据是否被删除。
    当用户执行了删除的动作时，我们并没有执行delete语句把数据删除掉，而是执行了update语句，将这条数据对应的删除状态设置为删除即可
*/ 
const sign_del = 'update users set status = 1 where id = ?';
db.query(sign_del, 10, (err, res) => {
    if(err) return console.log(err.message);
    // delete 执行的结果是对象
    if(res.affectedRows === 1) console.log('标记删除成功');
});