const Exception = require("./Exception");

module.exports = class UnauthorizedException extends Exception {
    err = 'Unauthorized';
    message = '';
    status = 401;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}
