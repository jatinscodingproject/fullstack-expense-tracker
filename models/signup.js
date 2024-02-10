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
    }
});

module.exports = UserDetails