const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const AppError = require('../utils/appError');
const { JWT_SECRET } = require('../config/env');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // 1. Obtener token del header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('No estás autenticado. Por favor inicia sesión.', 401));
    }

    // 2. Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)

    // 3. Verificar si el usuario aún existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('El usuario ya no existe.', 401));
    }

    // 4. Adjuntar usuario al request
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('No tienes permiso para realizar esta acción', 403));
    }
    next();
  };
};