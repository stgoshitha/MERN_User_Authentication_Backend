const express = require('express');
const {register,login} = require('../controllers/AuthController.js');
const AuthRoutes = express.Router();

AuthRoutes.post('/register', register );
AuthRoutes.post('/login', login );

module.exports = AuthRoutes;
