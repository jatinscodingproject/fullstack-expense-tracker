const Sequelize = require('sequelize');

const sequelize = require('../utils/db');

const UserDetails = sequelize.define('UserDetails',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
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