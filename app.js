const express = require('express');

require('dotenv').config()

const app = express();

const cors = require('cors');

const sequelize = require('./utils/db');

const expensedata = require('./models/expensedata');

const expenseRoutes = require('./routes/expenseroutes');

const signupRoutes = require('./routes/signuproutes');

const loginRoutes = require('./routes/loginroutes');

const purchaseRoutes = require('./routes/purchaseroutes');

const errorController = require('./controllers/error');

const expenseModel = require('./models/expensedata')

const userModel = require('./models/signup');

const OrderModel = require('./models/order');

app.use(cors());

app.use(express.static('public'));

app.use(express.static('images'));

app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(expenseRoutes)

app.use(signupRoutes)

app.use(loginRoutes)

app.use(purchaseRoutes)

userModel.hasMany(expenseModel)
expenseModel.belongsTo(userModel)

userModel.hasMany(OrderModel);
OrderModel.belongsTo(userModel)

sequelize
    .sync()
    .then(res => {
        //console.log(res)
        console.log('table created succesfully')
        app.listen(4000, () => {
            console.log('server listen on port 4000')
        })
    })
    .catch(err => {
        console.log(err)
    })