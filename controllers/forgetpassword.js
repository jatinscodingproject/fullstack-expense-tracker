const User = require('../models/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

exports.passwordResetLink = async (req, res, next) => {
    try {
        const email = req.body.emailId
        const user = await User.findOne({
            where: {
                emailId: email
            }
        })
        if (user) {
            console.log(email)
            let testaccount = await nodemailer.createTestAccount()

            const trasporter = await nodemailer.createTransport({
                host: 'gmail',
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                auth: {
                    user: process.env.User,
                    pass: process.env.APP_Password
                }            
            })

            let info = await trasporter.sendMail({
                from: '"Jatin Dixit" <jatin.a.dixit@slrtce.in>',
                to: email,
                subject: "To Reset password plz click on below link",
                text: "To cahnge password",
                html: `<a href='../views/passwordreset.html>click me</a>`,
            })
            console.log("Message sent: %s", info.messageId);
            res.json({'success':true,message:'Reset link send successfully'})
        } else {
            res.status(404).json('User Not found')
            console.log('User doesnt exists')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error')
    }
}