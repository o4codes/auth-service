const tokenize = require('../utils/tokenize');
const userModel = require('../models/user');

function authMiddleware(...roles){
    return (req, res, next) => {
        try{
            let token = req.headers['authorization'];
            if (token) {
                token = token.split(' ')[1];
                const decrypted = tokenize.decrypt(token);
                userModel.findOne({ _id: decrypted.id })
                    .then(user => {
                        if (!user) {
                            return res.status(401).send({
                                "status": "fail",
                                "message": "Invalid credentials",
                            });
                        } else {
                            // check if user has required access role
                            if (roles.length != 0 && !roles.includes(user.role)) {
                                return res.status(403).send({
                                    "status": "fail",
                                    "message": "Not enough permissions",
                                });
                            }

                            // check if user is logged in
                            if (user.is_logged_in === false) {
                                return res.status(401).send({
                                    "status": "fail",
                                    "message": "User is not logged in",
                                });
                            }
                            req.user = user;
                            next();
                        }
                    }).catch(err => {
                        console.log(err);
                        return res.status(500).send({
                            "status": "fail",
                            "message": "Server error",
                        });
                    });
            }
            else {
                return res.status(401).send({
                    "status": "fail",
                    "message": "Unauthorized"
                });
            }
        }
        catch(err){
            // catch jwt error
            console.log(err);
            if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                return res.status(401).send({
                    "status": "fail",
                    "message": "Invalid token",
                });
            }

            return res.status(500).send({
                "status": "fail",
                "message": "Server error",
            });
        }
    }
}


module.exports = {
    authMiddleware,
}