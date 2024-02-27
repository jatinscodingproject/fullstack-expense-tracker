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
    ForgetPassword.findOne({
        where: {
            id: id
        }
    }).then((forgetPasswordReq) => {
        if (forgetPasswordReq) {
            forgetPasswordReq.update({ active: false })
            console.log(3)
            res.status(200).sendFile(`<html>
                                        <script>
                                            function formsubmitted(e){
                                                e.preventDefault();
                                                console.log('called')
                                            }
                                        </script>
                                        
                                        <form action="/password/updatepassword/${id}" method="get">
                                            <label for="newpassword">Enter New password</label>
                                            <input name="newpassword" type="password" required></input>
                                            <button>reset password</button>
                                        </form>
                                    </html>`)
            res.end()
        }
    })
}

const updatePassword = (req,res,next) => {
    try{
        const newPassword = req.query
        const updatedpassword = req.params
        ForgetPassword.findOne({where:{id: forgetPassword.id}}).then(resetpasswordRequest => {
            User.findOne({where:{id:resetpasswordRequest.UserDetailId}}).then((user) => {
                if(user){
                    const saltRounds = 10
                    bcrypt.genSalt(saltRounds , (err,salt) => {
                        if(err){
                            console.log(err)
                            throw new Error(err)
                        }
                        bcrypt.hash(newPassword , salt ,(err,hash) => {
                            if(err){
                                console.log(err)
                                throw new Error(err)
                            }
                            user.update({Password:hash}).then(() => {
                                res.status(200).json({message:'Successfully updatednew password'})
                            })
                        })
                    })

                }else{

                }
            })
        })
    }catch(err){
        console.log(err)
        res.status(500).json({err,success:false})
    }
}

module.exports = {
    passwordResetLink: passwordResetLink,
    forgetPassword: forgetPassword
}