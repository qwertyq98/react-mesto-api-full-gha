require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const indexRouter = require('./routes/index');
const errorHandler = require('./utils/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const {
  PORT = 3000,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;
const app = express();

mongoose.connect(MONGODB_URL);

app.use(cookieParser());
app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.use('/', indexRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
