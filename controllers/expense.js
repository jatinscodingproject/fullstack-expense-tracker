const expenseDetails = require('../models/expensedata')
const sequelize = require('../utils/db');

exports.postExpenseData = async (req, res, next) => {
    const t = await sequelize.transaction()
    try{
        const {amount,description,category} = req.body;
        const expense = await expenseDetails.create({
            amount:amount,
            description:description,
            category:category,
            UserDetailId:req.user.id
        },{transaction:t})
        const totalExpense = Number(req.user.totalExpense) + Number(amount)
        const UpdateUsertable = await req.user.update({totalExpense:totalExpense},{where:{id:req.user.update},transaction:t})

        Promise.all([expenseDetails,UpdateUsertable]).then(async () => {
            await t.commit()
            return res.status(200).json(expense)
        })
    }catch(err){
        await t.rollback()
        console.log(err)
    }
}

exports.getAllExpenseDetails = (req, res, next) => {
    expenseDetails
        .findAll({
            where: {
                UserDetailId: req.user.id
            }
        })
        .then((details) => {
            res.json(details)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteUserDetails = async (req, res, next) => {
    const t = await sequelize.transaction()
    try{
        const dId = req.params.dId
        const expensedata = await expenseDetails.findByPk(dId,{
            attributes:['UserDetailId','amount']
        })
        const deleteddata = await expenseDetails
            .destroy({
                where: {
                    id: dId,
                    UserDetailId: req.user.id
                },
                transaction:t
            })
        const newamount = Number(req.user.totalExpense) - Number(expensedata.amount)
        const updateUser = await req.user.update({totalExpense:newamount},{where:{id:req.user.id},transaction:t})

        Promise.all([deleteddata,updateUser]).then(async() => {
            await t.commit()
            return res.json(deleteddata)
        })
        }catch(err){
            await t.rollback()
            console.log(err)
        }
}

exports.editUserDetails = (req, res, next) => {
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