const Loan = require('../models/Loans');
const Book = require('../models/Book');
const AppError = require('../utils/appError');

exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find()
      .populate('book')
      .populate('user', 'firstName lastName email');
    
    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ user: req.user._id })
      .populate('book');
    
    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createLoan = async (req, res, next) => {
  try {
    // 1. Verificar que el libro existe y hay copias disponibles
    const book = await Book.findById(req.body.bookId);
    if (!book) {
      return next(new AppError('No se encontró el libro con ese ID', 404));
    }
    
    if (book.availableCopies < 1) {
      return next(new AppError('No hay copias disponibles de este libro', 400));
    }

    // 2. Crear el préstamo
    const newLoan = await Loan.create({
      book: req.body.bookId,
      user: req.user._id
    });

    // 3. Populate para devolver datos completos
    await newLoan.populate('book');
    await newLoan.populate('user', 'firstName lastName email');

    res.status(201).json({
      status: 'success',
      data: {
        loan: newLoan
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.returnLoan = async (req, res, next) => {
  try {
    // 1. Encontrar el préstamo
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return next(new AppError('No se encontró el préstamo con ese ID', 404));
    }

    // 2. Verificar que no esté ya devuelto
    if (loan.status === 'returned') {
      return next(new AppError('Este libro ya fue devuelto', 400));
    }

    // 3. Actualizar el préstamo
    loan.returnDate = new Date();
    loan.status = 'returned';
    await loan.save();

    // 4. Incrementar copias disponibles
    await Book.findByIdAndUpdate(loan.book, { $inc: { availableCopies: 1 } });

    res.status(200).json({
      status: 'success',
      data: {
        loan
      }
    });
  } catch (err) {
    next(err);
  }
};