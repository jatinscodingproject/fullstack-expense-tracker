const UserDetails = require('../models/signup');

exports.UserExistsInDb = (req,res,next) => {
    const emailId = req.body.emailId
    const password = req.body.password
    console.log(req.body)
    UserDetails
        .findOne({where:{
            emailId:emailId,
        }})
        .then(result => {
            if(!result){
                res.status(404).json({message:'User doesnt exists'})
            }
            if(result.Password !== password){
                res.status(401).json({message:'password doesnt match'})
            }
            res.status(200).json({message:'User login successfully'})
        })
        .catch(err => {
            console.log(err)
        })

}