const express = require('express');

const app = express();

const cors = require('cors');

const sequelize = require('./utils/db');

const expensedata = require('./models/expensedata');

const expenseRoutes = require('./routes/expenseroutes');

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use(expenseRoutes)

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