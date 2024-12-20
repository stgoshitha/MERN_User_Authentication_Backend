const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email,role, password } = req.body;

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
            firstName,
            lastName,
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
        console.error(err);
        res.status(500).send({
            success:false,
            message: 'Internal server error'
        });
    }
};


const login  = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(401).json({
                success:false,
                message: 'Invalid credentials'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie('token', token,{
            httpOnly: true,
            secure: false,
            maxAge:3600000
        })

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            user,
            token
        })
        
        }catch(err){
            res.status(500).send({
                success:false,
                message: 'Internal server error'
            });
        }
}


const logout = async(req,res) =>{
    try{
        res.clearCookie('token');
        res.status(200).json({
            success:true,
            message: 'Logout successfully'
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message: 'Internal server error'
        });
    }

}

const getOneUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
};


module.exports = {register, login, logout, getOneUser};
