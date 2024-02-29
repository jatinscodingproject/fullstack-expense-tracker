const express = require('express');
require('dotenv').config()
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs')
const path = require('path')

const app = express();
const cors = require('cors');

const sequelize = require('./utils/db');
const expensedata = require('./models/expensedata');
const expenseRoutes = require('./routes/expenseroutes');
const signupRoutes = require('./routes/signuproutes');
const loginRoutes = require('./routes/loginroutes');
const purchaseRoutes = require('./routes/purchaseroutes');
const preminumfeatureRoutes = require('./routes/premiumfeatures');
const forgetPasswordRoutes = require('./routes/forgetpassword');
const errorController = require('./controllers/error');
const expenseModel = require('./models/expensedata')
const userModel = require('./models/signup');
const OrderModel = require('./models/order');
const passwordModel = require('./models/Password');
const fileDownloadModel = require('./models/downloadfiles')

app.use(cors());
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(helmet())
app.use(compression())

const createlogStream = fs.createWriteStream(path.join(__dirname,'accesslog'),{flag:'a'})
app.use(morgan('combined',{stream:createlogStream}))


app.use(expenseRoutes)
app.use(signupRoutes)
app.use(loginRoutes)
app.use(purchaseRoutes)
app.use(preminumfeatureRoutes)
app.use(forgetPasswordRoutes)

userModel.hasMany(expenseModel)
expenseModel.belongsTo(userModel)

userModel.hasMany(OrderModel);
OrderModel.belongsTo(userModel)

userModel.hasMany(passwordModel);
passwordModel.belongsTo(userModel);

userModel.hasMany(fileDownloadModel);
fileDownloadModel.belongsTo(userModel);

sequelize
    .sync()
    .then(res => {
        //console.log(res)
        console.log('table created succesfully')
        app.listen(process.env.PORT, () => {
            console.log('server listen on port',`${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })