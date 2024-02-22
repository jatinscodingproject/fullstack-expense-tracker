const User = require('../models/signup');
const Expenses = require('../models/expensedata');
const sequelize = require('../utils/db')

const PremiumUser = async (req,res,next) => {
    try{
        const userLeaderBoard = await User.findAll(
            // {
        //     attributes:['id','UserName',[sequelize.fn('sum',sequelize.col('amount')),'total_cost']],
        //     include:[
        //         {
        //             model:Expenses,
        //             attributes:[]
        //         }
        //     ],
        //     group:['UserDetails.id'],
        //     order:[['total_cost','DESC']]
        // }
            {
                attributes:['UserName','totalExpense']
            }
        );


        // const aggregatedamount = await Expenses.findAll({
        //     attributes:['UserDetailId',[sequelize.fn('sum',sequelize.col('amount')),'total_cost']],
        //     group:['UserDetailId']
        // });
        


        // const aggregatedamount = {}
        // expenses.forEach((expense) => {
        //     if(aggregatedamount[expense.UserDetailId]){
        //         aggregatedamount[expense.UserDetailId] = aggregatedamount[expense.UserDetailId] + parseInt(expense.amount)
        //     }else{
        //         aggregatedamount[expense.UserDetailId] = parseInt(expense.amount)  
        //     }
        // })



        // var userLeaderBoard = []
        // console.log(users)
        // users.forEach((user) => {
        //     userLeaderBoard.push({ name: user.UserName,total_cost:aggregatedamount[user.id] || 0})
        // })
        // userLeaderBoard.sort((a,b) => b.total_cost - a.total_cost)


        res.status(200).json(userLeaderBoard)
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    PremiumUser:PremiumUser
}