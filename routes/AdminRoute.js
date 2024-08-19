const express = require('express');
const { getUser, deletUser } = require('../controllers/AdminController.js');
const { isAdmin } = require('../middleware/VerifyToken.js');

const AdminRoutes = express.Router();

AdminRoutes.get('/getUser', isAdmin, getUser);
AdminRoutes.delete('/delet/:id',isAdmin,deletUser)

module.exports = AdminRoutes;
