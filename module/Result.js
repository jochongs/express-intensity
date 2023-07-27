const Exception = require("../exception/Exception");

module.exports = class Result {
    message = null;
    status = 200;
    data = {};

    constructor(err) {
        if (err) {
            if (err instanceof Exception) {
                this.message = err.message;
                this.status = err.status || 500;
            } else if (err.status === 400 && err.type === 'entity.parse.failed') {
                //express.json() Error
                this.message = 'json 파싱 실패: json 형식이 유효하지 않습니다.';
                this.status = err.status;
            } else {
                this.message = '예상하지 못한 에러가 발생했습니다.';
                this.status = 500;
            }
        }
    }
}
