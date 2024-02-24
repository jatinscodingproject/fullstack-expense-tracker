const sequelize = require('../utils/db');

const Sequelize =  require('sequelize');

const forgetPassword = sequelize.define('forgetPassword',{
    isActive:{
        type:Sequelize.BOOLEAN,
    },
    createdAt:{
        type:Sequelize.DATE
    }
})

module.exports = forgetPassword