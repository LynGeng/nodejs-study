const express = require('express');
const router = require('./router');

const app = express();

app.use(router);

app.listen(80, () => {
    console.log('server running at http://127.0.0.1/')
})

