const signoutRouter = require('express').Router();
const { logout } = require('../controllers/users');

signoutRouter.post('/', logout);

module.exports = signoutRouter;
