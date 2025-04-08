const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar si el usuario existe
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AppError('Credenciales incorrectas', 401));
    }

    // 2. Verificar contraseña
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      return next(new AppError('Credenciales incorrectas', 401));
    }

    // 3. Generar token JWT
    const token = signToken(user._id);

    // 4. Enviar respuesta
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

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