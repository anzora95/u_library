const express = require('express');
const userController = require('../controllers/usersControllers');
const authController = require('../controllers/authController');

const router = express.Router();

// Solo bibliotecarios pueden acceder a estas rutas
router.use(authController.protect, authController.restrictTo('librarian'));

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;