const user_model = require('../models/user');
const hashing = require('../utils/hashing');

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

async function updateUser(req, res) {
    const { id } = req.params;
    const user = await user_model.findById(id);

    if (!user) {
        return res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    }

    if (req.user._id != id) {
        return res.status(403).send({
            "status": "fail",
            "message": "You are not authorized to update this user",
        });
    }

    const { firstname, email, lastname, password} = req.body;
    user.firstname = firstname == undefined ? user.firstname : firstname;
    user.email = email == undefined ? user.email : email;
    user.password = password == undefined ? user.password : hashing.hash_password(password);
    await user.save();
    return res.status(200).send({
        "status": "success",
        "message": "User updated successfully",
        "data": user
    });
}

// deletes a particular user
async function deleteUser(req, res) {
    const { id } = req.params;
    const user = await user_model.findById(id);
    if (!user) {
        return res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    }
    await user.remove();
    return res.status(200).send({
        "status": "success",
        "message": "User deleted successfully",
    });
}

async function changeUserRole(req, res) {
    const { id } = req.params;
    const user = await user_model.findById(id);
    if (!user) {
        return res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    }
    const { role } = req.body;
    user.role = role == undefined ? user.role : role;
    await user.save();
    return res.status(200).send({
        "status": "success",
        "message": "User role updated successfully",
        "data": user
    });
}


module.exports = {
    listUsers,
    getUser,
    deleteUser,
    updateUser,
    changeUserRole
}