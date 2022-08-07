const router = require('express').Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authentication')

router.get('/', authMiddleware.authMiddleware("admin", "manager"), userController.listUsers)
router.get('/:id', authMiddleware.authMiddleware(), userController.getUser)
router.put('/:id', authMiddleware.authMiddleware(), userController.updateUser)
router.delete('/:id', authMiddleware.authMiddleware("admin" ), userController.deleteUser)
router.put('/:id/role', authMiddleware.authMiddleware("admin"), userController.changeUserRole)
module.exports = router;