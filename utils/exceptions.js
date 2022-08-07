class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestException';
        this.status = 400;
    }
}

class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundException';
        this.status = 404;
    }
}

class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedException';
        this.status = 401;
    }
}

class ForbiddenException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenException';
        this.status = 403;
    }
}

class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ServerError';
        this.status = 500;
    }
}

module.exports = {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
    ServerError,
};