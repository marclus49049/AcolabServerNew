const express = require('express');
const bodyParser = require('body-parser');
const usersRouters = require('./routes/users');
const initiateMongoServer = require('./config/db');
const userSub = require('./routes/userSub');
const deductCredit = require('./routes/deductCredit');
const leaderboard = require('./routes/leaderboard');

// import bodyParser from 'body-parser';
// import usersRouters from './routes/users.js';
// import initiateMongoServer from './config/db.js'
// import userSub from './routes/userSub.js';
// import deductCredit from './routes/deductCredit.js';
// import leaderboard from './routes/leaderboard.js';

const app = express();
const PORT = process.env.PORT || 5000;

initiateMongoServer() // Connects to mongo db

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Users Routes
app.use('/users', usersRouters);

//User Subscription
app.use('/user_sub', userSub);

//Deduct Webinar Credit
app.use('/deduct_credit', deductCredit);

//Deduct Webinar Credit
app.use('/leaderboard_action', leaderboard);

app.get('/', (req, res) => {
    console.log('API is Running');
});

app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`);
});