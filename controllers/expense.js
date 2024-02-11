const expenseDetails = require('../models/expensedata')

exports.getUiPage = (req, res, next) => {
    res.status(200).sendFile('index.html', {
        root: 'views'
    });
}


exports.postExpenseData = (req,res,next) => {
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    expenseDetails
    .create({
        amount:amount,
        description:description,
        category:category
    })
    .then((details) => {
        console.log('data added successfully')
        res.json(details)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getAllExpenseDetails = (req,res,next) => {
    expenseDetails
        .findAll()
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
            id:dId
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