const router = require('express').Router();
const authController = require('../controllers/auth')
const authMiddleware = require('../middlewares/authentication')
const asyncHandler = require('express-async-handler')

router.post('/signup', asyncHandler(authController.signup))
router.post('/login', asyncHandler(authController.login))
router.get('/logout', authMiddleware.authMiddleware(), asyncHandler(authController.logout))
router.get('/verify/:token', asyncHandler(authController.verify))
router.post('/password_reset', asyncHandler(authController.reset_password))
router.post('/confirm_password_reset/:token', asyncHandler(authController.confirm_reset_password))

module.exports = router