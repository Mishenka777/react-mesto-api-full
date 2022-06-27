const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const { regular } = require('../utils/constants');
const {
  getUsers,
  getUserById,
  patchUserInfo,
  patchUserAvatar,
  getUserMe,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUserInfo);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regular),
  }),
}), patchUserAvatar);

module.exports = userRouter;
