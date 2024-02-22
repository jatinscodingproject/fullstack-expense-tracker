const User = require('../models/signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sib = require('sib-api-v3-sdk');

exports.passwordResetLink = async(req,res,next) => {
    const emailId = req.body
    console.log(emailId)
    const client = sib.ApiClient.instance
    const apikey = client.authentications['api-key']
    apikey.apikey = process.env.API_KEY
    const tranEmailApi = new sib.TransactionalEmailsApi()

    const sender = {
        emailId:'jatin.a.dixit@slrtce.in',
        name:'Expense tracker App'
    }
    const receiver = {
        emailId:emailId
    }
    tranEmailApi.sendTransacEmail({
        sender,
        to:receiver,
        subject:'Password reset link',
        textContent:`hey i am jatin`
    }).then(() => {
        console.log('Password reset link successfully')
    }).catch((err) => {
        console.log(err)
    })
}