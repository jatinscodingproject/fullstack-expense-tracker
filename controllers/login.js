const UserDetails = require('../models/signup');

exports.UserExistsInDb = (req,res,next) => {
    const emailId = req.body.emailId
    const Password = req.body.password

    UserDetails
        .findOne({where:{
            emailId:emailId,
            Password:Password
        }})
        .then(result => {
            if(result){
                console.log('User Exists in Db');
                res.josn({exists:true})
            }
            else{
                console.log('User doesnt Exists');
                res.json({exists:false})
            }
        })
        .catch(err => {
            console.log(err)
        })

}