const sequelize = require('../utils/db');

const  Sequelize = require('sequelize');

const DownloadedFile = sequelize.define('DownloadedFile',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    FileUrl:{
        type:Sequelize.STRING
    }
}) 

module.exports = DownloadedFile