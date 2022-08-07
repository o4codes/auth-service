const tokenize = require('../utils/tokenize');
const userModel = require('../models/user');
const exceptions = require('../utils/exceptions');

function authMiddleware(...roles) {
    return (req, res, next) => {
        let token = req.headers['authorization'];
        if (token) {
            token = token.split(' ')[1];
            const decrypted = tokenize.decrypt(token);
            userModel.findOne({ _id: decrypted.id })
                .then(user => {
                    if (!user) {
                        throw new exceptions.UnauthorizedException('Invalid token');
                    } else {
                        // check if user has required access role
                        if (roles.length != 0 && !roles.includes(user.role)) {
                            throw new exceptions.ForbiddenException('Not enough permissions');
                        }

                        // check if user is logged in
                        if (user.is_logged_in === false) {
                            throw new exceptions.UnauthorizedException('User is not logged in');
                        }
                        req.user = user;
                        next();
                    }
                }).catch(err => {
                    console.log(err);
                    throw new exceptions.ServerError('Something went wrong');
                });
        }
        else throw new exceptions.UnauthorizedException('No token provided');
    }

}


module.exports = {
    authMiddleware,
}