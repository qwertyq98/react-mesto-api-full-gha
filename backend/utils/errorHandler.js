const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const BaseError = require('../errors/BaseError');

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  }

  if (err instanceof DocumentNotFoundError) {
    return res.status(404).send({
      message: err.message,
    });
  }

  if (err instanceof CastError) {
    return res.status(400).send({
      message: 'Запрашиваемые данные не найдены',
    });
  }

  if (err.code === 11000) {
    return res.status(409).send({
      message: 'Указанный email уже зарегистрирован',
    });
  }

  res.status(500).send('Ошибка на сервере');
  return next();
}

module.exports = errorHandler;
