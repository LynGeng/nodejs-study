// 导入express
const express = require('express');
// 获取router对象
const router = express.Router();
// 在router上挂载路由
router.get('/', (req, res) => {
    res.send('get /');
});

router.post('/', (req, res) => {
    res.send('post /');
});

module.exports = router; // 向外导出路由对象