const Exception = require("./Exception");

module.exports = class NotFoundException extends Exception {
    err = 'Not Found';
    message = '';
    status = 404;

    constructor(message, error) {
        super(error);

        this.message = message;
    }
}
