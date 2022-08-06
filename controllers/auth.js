const user_model = require('../models/user');
const hashing = require('../utils/hashing');
const mailing = require('../utils/mailing');
const tokenize = require('../utils/tokenize');

async function signup(req, res) {
    const { firstname, lastname, email, password, role } = req.body;
    const hashed_password = await hashing.hash_password(password);
    const user = new user_model({
        firstname,
        lastname,
        email,
        password: hashed_password,
        role
    });
    await user.save();
    const token = tokenize.encrypt(
        { id: user._id, email: user.email, role: user.role }
    )
    let baseUrl = req.protocol + '://' + req.get('host');
    mailing.send_mail(user.email, 'Verify your account', `verify your account by clicking this link: ${baseUrl}/auth/verify/${token}`);
    res.status(201).send({
        "status": "success",
        "message": "User created successfully",
    });
}


async function login(req, res) {
    const { email, password } = req.body;
    const user = await user_model.findOne({ email });
    if (!user) {
        res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    } else {
        const is_match = await hashing.compare_password(password, user.password);
        if (is_match) {
            const token = tokenize.encrypt(
                { id: user._id, email: user.email, role: user.role }
            )
            res.status(200).send({
                "status": "success",
                "message": "User logged in successfully",
                "token": token
            });
        } else {
            res.status(401).send({
                "status": "fail",
                "message": "Invalid credentials",
            });
        }
    }
}

async function verify(req, res) {
    const { token } = req.params;
    const decrypted = tokenize.decrypt(token);
    const user = await user_model.findOne({ _id: decrypted.id });
    if (!user) {
        res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    } else {
        user.is_verified = true;
        await user.save();
        res.status(200).send({
            "status": "success",
            "message": "User verified successfully",
        });
    }
}

async function reset_password(req, res){
    const { email } = req.body;
    const user = await user_model.findOne({ email });
    if (!user) {
        res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    } else {
        const token = tokenize.encrypt(
            { id: user._id, email: user.email, role: user.role }
        )
        let baseUrl = req.protocol + '://' + req.get('host');
        mailing.send_mail(user.email, 'Reset your password', `reset your password by clicking this link: ${baseUrl}/auth/confirm_password_reset/${token}`);
        res.status(200).send({
            "status": "success",
            "message": "Password reset link sent to your email",
        });
    }
}

async function confirm_reset_password(req, res){
    const { token } = req.params;
    const { password } = req.body;

    const decrypted = tokenize.decrypt(token);
    const user = await user_model.findOne({ _id: decrypted.id });
    if (!user) {
        res.status(404).send({
            "status": "fail",
            "message": "User not found",
        });
    } else {
        const hashed_password = await hashing.hash_password(password);
        user.password = hashed_password;
        await user.save();
        res.status(200).send({
            "status": "success",
            "message": "Password reset successfully",
        });
    }
}


module.exports = {
    signup,
    login,
    verify,
    reset_password,
    confirm_reset_password
}