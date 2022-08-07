const user_model = require('../models/user');

// gets all users
async function listUsers(req, res) {
    const users = await user_model.find();
    res.status(200).send({
        "status": "success",
        "message": "Users retrieved successfully",
        "data": users
    });
}


// gets a particular user
async function getUser(req, res) {
    const { id } = req.params;
    const user = await user_model.findById(id);
    if (!user) {
        res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    }
    res.status(200).send({
        "status": "success",
        "message": "User retrieved successfully",
        "data": user
    });
}

module.exports = {
    listUsers,
    getUser
}