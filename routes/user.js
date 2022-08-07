const router = require('express').Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authentication')

router.get('/', authMiddleware.authMiddleware("admin"), userController.listUsers)
router.get('/:id', authMiddleware.authMiddleware(), userController.getUser)

module.exports = router;