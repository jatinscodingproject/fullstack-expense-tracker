const UserDetails = require('../models/signup');
const bcrypt = require('bcrypt')

exports.UserExistsInDb = async (req,res,next) => {
    const emailId = req.body.emailId
    const password = req.body.password
    console.log(req.body)
    try{
        const User = await UserDetails
            .findOne({where:{
                emailId:emailId,
            }})
            const isPassword = bcrypt.compare(password,User.Password)
            if(!User){
                res.status(404).json({message:'User doesnt exists'});
            }
            if(!isPassword){
                res.status(401).json({message:'password doesnt match'})
            }
            res.status(200).json({message:'Login successfully'})
    }catch(err){
        console.log(err)
    }
}