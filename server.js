const express = require('express');
const app = express();
const path = require('path');
const Exception = require('./exception/Exception');
const Result = require('./module/Result');

const intensityApi = require('./routes/intensity');
const NotFoundException = require('./exception/NotFoundException');


const PUBLIC_PATH = path.join(__dirname, 'public'); // 배포 파일 위치

app.use(express.json());

app.use('/intensity', intensityApi);

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

app.use((req, res, next) => {
    next(new NotFoundException('페이지가 존재하지 않습니다.'));
});

app.use((err, req, res, next) => {
    console.log(err);
    const result = new Result(err);

    res.status(result.status).send(result);
});

app.listen('80', () => {
    console.log('server on');
});
