const express = require('express');
const {register, login, logout} = require('../controllers/AuthController.js');
const AuthRoutes = express.Router();

AuthRoutes.post('/register', register );
AuthRoutes.post('/login', login );
AuthRoutes.post('/logout', logout );

module.exports = AuthRoutes;
