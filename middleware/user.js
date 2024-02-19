const User = require('../models/signup');
const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    try{
        const token = req.header('Authorization');
        console.log(1)
        console.log(token);
        const user = jwt.verify(token,'secretKey');
        console.log('userId:',user.userId);
        User
            .findByPk(user.userId)
            .then(user => {
                req.user = user
                next()
            })
    }catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
}

module.exports  = {
    authenticate
}