const express = require('express');
const loanController = require('../controllers/loansController');
const authController = require('../controllers/authController');

const router = express.Router();

// Proteger todas las rutas
router.use(authController.protect);

// Rutas para estudiantes
router.get('/my', loanController.getMyLoans);
router.post('/', loanController.createLoan);
router.patch('/:id/return', loanController.returnLoan);

// Rutas solo para bibliotecarios
router.use(authController.restrictTo('librarian'));
router.get('/', loanController.getAllLoans);

module.exports = router;