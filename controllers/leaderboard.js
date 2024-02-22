const User = require('../models/signup');
const Expenses = require('../models/expensedata');
const sequelize = require('../utils/db')

const PremiumUser = async (req,res,next) => {
    try{
        const userLeaderBoard = await User.findAll(
            {
                attributes:['UserName','totalExpense'],
                order:[['totalExpense','Desc']]
            }
        );
        res.status(200).json(userLeaderBoard)
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    PremiumUser:PremiumUser
}