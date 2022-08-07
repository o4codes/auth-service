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
                            // pass user details to the next middleware
                            if (roles.length != 0 && !roles.includes(user.role)) {
                                return res.status(403).send({
                                    "status": "fail",
                                    "message": "Not enough permissions",
                                });
                            }
                            req.user = user;
                            next();
                        }
                    }).catch(err => {
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
            if (err.name === 'JsonWebTokenError') {
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