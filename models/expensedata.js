const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const expenseDetails = sequelize.define('expenseDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.STRING
    },
    category:{
        type:Sequelize.STRING
    }
});

module.exports = expenseDetails