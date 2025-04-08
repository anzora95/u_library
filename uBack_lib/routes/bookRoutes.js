const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');

const router = express.Router();

// Rutas públicas
router.get('/', bookController.getAllBooks);
router.get('/genres', bookController.getBookGenres);
router.get('/:id', bookController.getBook);

// Rutas protegidas (solo bibliotecarios)
router.use(authController.protect, authController.restrictTo('librarian'));

router.post('/', bookController.createBook);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;