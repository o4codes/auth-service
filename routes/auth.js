const router = require('express').Router();
const authController = require('../controllers/auth')
const authMiddleware = require('../middlewares/authentication')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authMiddleware.authMiddleware(), authController.logout)
router.get('/verify/:token', authController.verify)
router.post('/password_reset', authController.reset_password)
router.post('/confirm_password_reset/:token', authController.confirm_reset_password)

module.exports = router