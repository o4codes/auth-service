const errorHandler = (err, req, res, next) => {
    console.log(err.name);

    if (err.name === 'ValidationError') {
        return res.status(400).send({
            "status": "fail",
            "message": err.message,
        });
    }

    if (err.name === 'BadRequestException') {
        return res.status(400).send({
            "status": "fail",
            "message": err.message,
        });
    }

    if (err.name === 'NotFoundException') {
        return res.status(404).send({
            "status": "fail",
            "message": err.message,
        });
    }

    if (err.name === 'UnauthorizedException') {
        return res.status(401).send({
            "status": "fail",
            "message": err.message,
        });
    }

    if (err.name === 'ForbiddenException') {
        return res.status(403).send({
            "status": "fail",
            "message": err.message,
        });
    }

    if (err.name === 'ServerError') {
        return res.status(500).send({
            "status": "fail",
            "message": err.message,
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).send({
            "status": "fail",
            "message": "Invalid token",
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).send({
            "status": "fail",
            "message": "Token expired",
        });
    }

    return res.status(500).send({
        "status": "fail",
        "message": err.message,
    });
}

module.exports = errorHandler;