const expenseDetails = require('../models/expensedata')

exports.postExpenseData = (req,res,next) => {
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    expenseDetails
    .create({
        amount:amount,
        description:description,
        category:category,
        UserDetailId:req.user.id
    }).then(expense => {
        const totalExpense = Number(req.user.totalExpense) + Number(amount)
        console.log('<<<<<<<<<<<<<<',req.user.id)
        console.log('<<<<<<<<<<<<<<<<<<<<',req.user.totalExpense)
        console.log(totalExpense)
        req.user.update({
            totalExpense:totalExpense
        },{
            where:{
                id:req.user.id
            }
        }).then(async() => {
            res.status(200).json(expense)
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.getAllExpenseDetails = (req,res,next) => {
    expenseDetails
        .findAll({where:{
            UserDetailId : req.user.id
        }})
        .then((details) => {
            res.json(details)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteUserDetails = (req,res,next) => {
    const dId = req.params.dId
    expenseDetails
        .destroy({where:{
            id:dId,
            UserDetailId:req.user.id
        }})
        .then(result => {
            console.log('Data deleted successfully')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.editUserDetails = (req,res,next) => {
    const eId = req.params.eId
    expenseDetails
        .findByPk(eId)
        .then(result => {
            console.log('edit details')
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}