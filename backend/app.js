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
  NODE_ENV,
  PORT,
  MONGODB_URL,
} = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URL : 'mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());
app.use(express.json());
app.use(cors);

app.use(requestLogger);

app.use('/', indexRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log(`App listening on port ${PORT}`);
});
