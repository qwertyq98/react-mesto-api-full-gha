const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LINK_VALIDATOR } = require('../utils/constants');
const { createUser } = require('../controllers/users');

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK_VALIDATOR),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = signupRouter;
