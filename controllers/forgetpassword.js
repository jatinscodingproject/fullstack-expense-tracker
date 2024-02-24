const User = require('../models/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const UUID = require('uuid');
const ForgetPassword = require('../models/Password');

const passwordResetLink = async (req, res, next) => {
    try {
        const email = req.body.emailId
        const user = await User.findOne({
            where: {
                emailId: email
            }
        })

        if (user) {
            const id = UUID.v4()
            user.createForgetPassword({ id, isActive: true })
                .catch(err => {
                    console.log(err)
                })
            console.log(email)
            let testaccount = await nodemailer.createTestAccount()

            const trasporter = await nodemailer.createTransport({
                host: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
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
                html: `<a href='http://localhost:4000/forgetPassword/${id}>click me</a>`,
            })
            console.log("Message sent: %s", info.messageId);
            res.status(200).json({ 'success': true, message: 'Reset link send successfully' })
        } else {
            res.status(404).json('User Not found')
            console.log('User doesnt exists')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error')
    }
}

const forgetPassword = (req, res, next) => {
    const id = req.params.id
    console.log('<<<<<<<<<<<<<<<<<<<<<<<',2)
    ForgetPassword.findOne({
        where: {
            id: id
        }
    }).then((forgetPasswordReq) => {
        if (forgetPasswordReq) {
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<,',1)
            forgetPasswordReq.update({ active: false })
            console.log(3)
            res.status(200).sendFile('passwordreset.html', {
                root: 'views'
            })
            res.end()
        }
    })
}

module.exports = {
    passwordResetLink: passwordResetLink,
    forgetPassword:forgetPassword
}