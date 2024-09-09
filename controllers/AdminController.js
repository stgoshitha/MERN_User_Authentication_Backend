const userModel = require("../models/UserModel");

const getUser = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({users})

    } catch (err) {
        res.status(500).json({massage:'intenral server error'});
        console.log(err);
    }
};



const deletUser = async(req,res) =>{
    try {
        const userId = req.params.id

        const user = await userModel.findByIdAndDelete(userId)

        if(!user){
            res.status(404).json({massage:'user not found'})
        }
        res.status(200).json({massage:'user delet successfully'})

    } catch (err) {
        res.status(500).json({massage:'intenral server error'});
        console.log(err);
    }
}

module.exports = {getUser, deletUser};
