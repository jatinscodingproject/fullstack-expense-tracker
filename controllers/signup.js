const UserDetails = require('../models/signup')
const bcrypt = require('bcrypt')

// exports.getUserPage = (req,res,next) => {
//     res.status(200).sendFile('signup.html',{
//         root:'views'
//     })
// }

exports.postUserSignupDetails = async (req,res,next) => {
    const Username = req.body.Username;
    const emailId = req.body.emailId;
    const password = req.body.password;

    console.log(req.body)

    try {
        const saltRounds = 10
        const hashedPasswords = await bcrypt.hash(password,saltRounds);
        await UserDetails.create({
            UserName:Username,
            emailId:emailId,
            Password:hashedPasswords
        })
    }catch(err){
        console.log(err)
    }
}

exports.haveUser = (req,res,next) => {
    const emailId = req.query.emailId
    UserDetails
        .findOne({where:{emailId:emailId}})
        .then(result => {
            if (result){
                console.log('User Exists')
                res.json({exists:true})
            }else{
                console.log('User doesnt exist')
                res.json({exists:false})
            }
        })
        .catch(err => {
            console.log(err)
        })
}

