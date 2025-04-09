const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
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
    const isCorrect = await bcrypt.compare(password, user.password);
    console.log(isCorrect)
    
  
    if (!isCorrect) {
      console.log("enrta a cmparar")
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

exports.getMe = async (req, res) => {
  try {
    // El middleware de autenticación ya adjuntó el usuario al request
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error en getMe:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener información del usuario'
    });
  }
};