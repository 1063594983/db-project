const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const userApi = require('./api/userApi');
const goodsApi = require('./api/goodsApi');
const commentAPi = require('./api/commentApi');
const empApi = require('./api/empApi');
const customerApi = require('./api/customerApi');
const recordApi = require('./api/recordApi');

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/goods', goodsApi);
app.use('/api/comment', commentAPi);
app.use('/api/emp', empApi);
app.use('/api/customer', customerApi);
app.use('/api/record', recordApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');