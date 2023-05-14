const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserById, updateUser, updateUserAvatar, getUserMeById,
} = require('../controllers/users');
const { LINK_VALIDATOR } = require('../utils/constants');

userRouter.get('/me', getUserMeById);

userRouter.get('/', getUser);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(LINK_VALIDATOR),
  }),
}), updateUserAvatar);

module.exports = userRouter;
