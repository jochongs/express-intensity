const router = require('express').Router();
const uploadMiddleware = require('../middleware/uploadMiddleware');
const fs = require('fs');
const Result = require('../module/Result');
const ConflictException = require('../exception/ConflictException');

router.post('/', uploadMiddleware, async (req, res, next) => {
    //from FE
    const fileArray = req.files;

    //to FE
    const result = new Result();
    result.data.intensityArray = [];

    //main
    try {
        for (i in req.files) {
            const rowData = [];
            const originalFileName = req.files[i].originalname;
            console.log(req.files[i]);

            const csv = fs.readFileSync(`./source/${fileArray[i].filename}`, 'utf-8');
            let max90X = 0;
            let max90Y = -Infinity;

            let max170X = 0;
            let max170Y = -Infinity;

            let allRows = csv.split(/\n|\r/)

            for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
                let rowCells = allRows[singleRow].split(',')

                if (singleRow !== 0) {
                    const x = rowCells[0] = parseFloat(rowCells[0]);
                    const y = rowCells[1] = parseFloat(rowCells[1]);

                    if (x > 80 && x < 100) { // 90구간 피크치 구하기
                        if (y > max90Y) {
                            max90X = x;
                            max90Y = y;
                        }
                    }

                    if (x > 160 && x < 190) { // 170구간 피크치 구하기
                        if (y > max170Y) {
                            max170X = x;
                            max170Y = y;
                        }
                    }
                    //rowData.push(rowCells)
                }
            }

            result.data.intensityArray.push({
                fileName: originalFileName,
                section90X: max90X,
                section90Y: max90Y,
                section170X: max170X,
                section170Y: max170Y
            });
            console.log(originalFileName);
            console.log('90');
            console.log(max90X);
            console.log(max90Y);
            console.log('170');
            console.log(max170X);
            console.log(max170Y);
            console.log('================');
        }
    } catch (err) {
        return next(new ConflictException('예상하지 못한 에러가 발생했습니다.', err));
    }

    //send result
    res.status(result.status).send(result);
});

module.exports = router;
