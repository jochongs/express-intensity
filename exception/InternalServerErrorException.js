const Exception = require("./Exception");

module.exports = class InternalServerErrorException extends Exception {
    err = 'Internal Server Error';
    message = '서버 에러가 발생했습니다.';
    status = 500;

    constructor(message, error) {
        super(error);

        if (message) {
            this.message = message;
        }
    }
}
