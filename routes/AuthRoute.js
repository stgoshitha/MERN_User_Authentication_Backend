const express = require('express');
const {register, login, logout, getOneUser} = require('../controllers/AuthController.js');
const AuthRoutes = express.Router();

AuthRoutes.post('/register', register );
AuthRoutes.post('/login', login );
AuthRoutes.post('/logout', logout );
AuthRoutes.get('/user/:userId', getOneUser);

module.exports = AuthRoutes;
