const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        const { name, email,role, password } = req.body;

        //find user already exist or not using email
        const existUser = await userModel.findOne({email});

        if(existUser){
            return res.status(401).json({
                success:false,
                message: 'User already exists'
            });
        }

        //Hashed the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user object
        const newUser = new userModel({
            name,
            email,
            role,
            password:hashedPassword
        });

        //save new user
        await newUser.save();

        res.status(200).json({
            massage:"Register successfully",
            newUser
        })
        
    } catch (err) {
        res.status(500).send({
            success:false,
            message: 'Internal server error'
        });
    }
};

module.exports = register;
