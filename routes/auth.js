const router = require('express').Router();
const authController = require('../controllers/auth')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/verify/:token', authController.verify)
router.post('/password_reset', authController.reset_password)
router.post('/confirm_password_reset/:token', authController.confirm_reset_password)

module.exports = router