const Book = require('../models/Book');
const AppError = require('../utils/appError');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    
    res.status(200).json({
      status: 'success',
      results: books.length,
      data: {
        books
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return next(new AppError('No se encontró el libro con ese ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        book
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        book: newBook
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!book) {
      return next(new AppError('No se encontró el libro con ese ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        book
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return next(new AppError('No se encontró el libro con ese ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookGenres = async (req, res, next) => {
  try {
    const genres = await Book.distinct('genre');
    
    res.status(200).json({
      status: 'success',
      data: {
        genres
      }
    });
  } catch (err) {
    next(err);
  }
};