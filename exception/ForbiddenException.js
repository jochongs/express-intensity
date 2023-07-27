const Exception = require("./Exception");

module.exports = class ForbiddenException extends Exception {
    err = 'Forbidden';
    message = '';
    status = 403;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}
