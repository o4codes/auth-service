const router = require('express').Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authentication')
const asyncHandler = require('express-async-handler')

router.get('/', authMiddleware.authMiddleware("admin", "manager"), asyncHandler(userController.listUsers))
router.get('/:id', authMiddleware.authMiddleware(), asyncHandler(userController.getUser))
router.put('/:id', authMiddleware.authMiddleware(), asyncHandler(userController.updateUser))
router.delete('/:id', authMiddleware.authMiddleware("admin" ), asyncHandler(userController.deleteUser))
router.put('/:id/role', authMiddleware.authMiddleware("admin"), asyncHandler(userController.changeUserRole))
module.exports = router;