const UserDetails = require('../models/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getUserLoginPage = (req,res,next) => {
    res.status(200).sendFile('login.html',{
        root:'views'
    })
}

function generateSecretToken(id,IsPremiumUser){
    return jwt.sign({userId:id,IsPremiumUser},'secretKey')
}

const UserExistsInDb = async (req, res, next) => {
    const emailId = req.body.emailId;
    const password = req.body.password;
    console.log(req.body);
    try {
        const user = await UserDetails.findOne({ where: { emailId: emailId } });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.Password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Password does not match' });
        }
        const token = generateSecretToken(user.id,user.IsPremiumUser)
        res.status(200).json({ message: 'Login successful' , token:token})
        console.log(token)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUserLoginPage:getUserLoginPage,
    UserExistsInDb:UserExistsInDb,
    generateSecretToken:generateSecretToken
}

