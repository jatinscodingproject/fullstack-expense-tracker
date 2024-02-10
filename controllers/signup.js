const UserDetails = require('../models/signup')


// exports.getUserPage = (req,res,next) => {
//     res.status(200).sendFile('signup.html',{
//         root:'views'
//     })
// }

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
            //console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getUserDetails = (req,res,next) => {
    UserDetails
        .findAll()
        .then(Details => {
            console.log('Data extracted successfully')
            res.json(Details)
        })
        .catch(err => {
            console.log(err)
        })
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