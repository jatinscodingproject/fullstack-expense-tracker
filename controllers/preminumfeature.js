const User = require('../models/signup');
const Expenses = require('../models/expensedata');
const sequelize = require('../utils/db');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const downloadfiles = require('../models/downloadfiles');
const expenseDetails = require('../models/expensedata');
const DATA_PER_PAGE = 5

function uploadToS3(data, filename) {
    const BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY = process.env.IAM_USER_KEY
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    })
    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((res, rej) => {
        s3Bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('Something went wrong', err)
                rej(err)
            } else {
                console.log('Success', s3response)
                res(s3response.Location)
            }
        })
    })
}

const PremiumUser = async (req, res, next) => {
    try {
        const userLeaderBoard = await User.findAll(
            {
                attributes: ['UserName', 'totalExpense'],
                order: [['totalExpense', 'Desc']]
            }
        );
        res.status(200).json(userLeaderBoard)
    } catch (err) {
        console.log(err)
    }
}

const downloadUserreport = async (req, res, next) => {
    try {
        const id = req.user.id
        const expenseDetails = await Expenses.findAll({
            where: {
                UserDetailId: id
            }
        })
        const stringifiedExpenses = JSON.stringify(expenseDetails);
        const filename = `expense${id}/${new Date()}.txt`
        const fileUrl = await uploadToS3(stringifiedExpenses, filename)
        console.log(fileUrl)
        downloadfiles.create({
            FileUrl:fileUrl,
            UserDetailId:id
        })
        return res.status(200).json({ fileUrl, success: true })
    } catch (err) {
        console.log(err)
        return res.status(500).json({fileUrl:'',success:false,err:err})
    }
}

const generateUserReport = async (req,res,next) => {
    try{
        const id = req.user.id
        const page = +req.query.page || 1;
        console.log(page)
        let totalDataPage;
        return expenseDetails.findAll({
            where:{
                    id:req.user.id
            },
            offset: (page - 1) * DATA_PER_PAGE,
            limit: DATA_PER_PAGE
        })
        .then((expenses) => {
            console.log(expenses)
            return res.status(200).json({
                expenses:expenses,
                currentPage:page,
                hasNextPage:DATA_PER_PAGE * page < totalDataPage,
                nextPage:page + 1,
                hasPreviousPage: page > 1,
                previousPage:page-1,
                lastPage:Math.ceil(totalDataPage/DATA_PER_PAGE)
            })
        })
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Something went wrong'})
    }
}

const getAllDownloadedFiles = async(req,res,next) => {
    try{
    const id = req.user.id
    const allfilesDownloaded = await downloadfiles.findAll({
        where:{
            UserDetailId:id   
        }
    })
    console.log(allfilesDownloaded)
    return res.status(200).json(allfilesDownloaded)
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Something went wrong'})
    }
}

module.exports = {
    PremiumUser: PremiumUser,
    downloadUserreport: downloadUserreport,
    generateUserReport:generateUserReport,
    getAllDownloadedFiles:getAllDownloadedFiles
}