const express = require('express');
const register = require('../controllers/AuthController.js');
const AuthRoutes = express.Router();

AuthRoutes.post('/register', register );

module.exports = AuthRoutes;
