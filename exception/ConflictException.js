const Exception = require("./Exception");

module.exports = class ConflictException extends Exception {
    err = 'Conflict';
    message = '예상하지 못한 에러가 발생했습니다.';
    status = 409;

    constructor(message, error) {
        super(error);

        if (message) {
            this.message = message;
        }
    }
}
