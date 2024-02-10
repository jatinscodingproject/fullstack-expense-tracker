const UserDetails = require('../models/signup')


exports.getUserPage = (req,res,next) => {
    res.status(200).sendFile('signup.html',{
        root:'views'
    })
}

exports.postUserSignupDetails = (req,res,next) => {
    const Username = req.body.Username;
    const emailId = req.body.emailId;
    const password = req.body.password;

    console.log(req.body)

    UserDetails
        .create({
            UserName:Username,
            emailId:emailId,
            Password:password
        })
        .then(result => {
            console.log('User created Successfully')
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}