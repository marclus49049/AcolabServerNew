const express = require('express');
const https = require('https');
const fs = require('fs');
const options = {
	key: fs.readFileSync('./certificates/key.pem'),
	cert: fs.readFileSync('./certificates/cert.pem')
};
const bodyParser = require('body-parser');
const usersRouters = require('./routes/users');
const initiateMongoServer = require('./config/db');
const userSub = require('./routes/userSub');
const deductCredit = require('./routes/deductCredit');
const leaderboard = require('./routes/leaderboard');
const webinar = require('./routes/addwebinar');
const generatemail = require('./routes/generatemail');
const addorder = require('./routes/order');
const hackathon = require('./routes/hackathon');
const HackaMentorRegis = require('./routes/hackathon');
const OTP = require('./routes/otp');
const speaker = require('./routes/speaker');
var cors = require('cors');

// import bodyParser from 'body-parser';
// import usersRouters from './routes/users.js';
// import initiateMongoServer from './config/db.js'
// import userSub from './routes/userSub.js';
// import deductCredit from './routes/deductCredit.js';
// import leaderboard from './routes/leaderboard.js';

// Enable this during production
var corsOptions = {
	origin: 'http://www.acolab.org',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const PORT = process.env.PORT || 5000;

initiateMongoServer(); // Connects to mongo db

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Users Routes
app.use('/users', usersRouters);

//User Subscription
app.use('/user_sub', userSub);

//Deduct Webinar Credit
app.use('/deduct_credit', deductCredit);

//Deduct Webinar Credit
app.use('/leaderboard_action', leaderboard);

//webinar apis
app.use('/webinar', webinar);

app.use('/generatemail', generatemail);

app.use('/addorder', addorder);

app.use('/hackathon', hackathon);

app.use('/RegisterHackathon', HackaMentorRegis);

app.use('/otp',OTP);

app.use('/speaker',speaker)

app.use('/home/admin/userdata/speaker', express.static('/home/admin/userdata/speaker'));


app.get('/', (req, res) => {
	console.log('API is Running');
});

app.listen(PORT, () => {
	console.log(`Server Running on port: http://localhost:${PORT}`);
});

const httpsserver =  https.createServer(options,app);
httpsserver.listen(5001);
console.log('https server started');