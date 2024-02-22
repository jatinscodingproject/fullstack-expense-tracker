const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const UserDetails = sequelize.define('UserDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    UserName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emailId:{
        type:Sequelize.STRING,
        allowNull:false,
        //unique:true
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    IsPremiumUser:Sequelize.BOOLEAN,
    totalExpense:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
});

module.exports = UserDetails