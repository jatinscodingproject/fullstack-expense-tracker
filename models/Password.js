const sequelize = require('../utils/db');

const Sequelize =  require('sequelize');

const forgetPassword = sequelize.define('forgetPassword',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
    },
    createdAt:{
        type:Sequelize.DATE
    }
})

module.exports = forgetPassword