const Exception = require("./Exception");

module.exports = class BadRequestException extends Exception {
    err = 'Bad Request';
    message = '';
    status = 400;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}
