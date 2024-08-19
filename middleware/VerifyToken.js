const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel.js');

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({ message: 'user not found' });
        }

        if(user.role !== 'admin'){
            return res.status(401).json({ message: 'Unauthorized: Not an admin' });
        }

        req.user = user;
        next();

        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { isAdmin };
