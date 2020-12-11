const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const user = require('../model/user');
const OTP = require('../model/otp');
const oauth2Client = new OAuth2(
	'1047201258535-072t7sqlg9bicd3n6bts74ltdq1g3819.apps.googleusercontent.com', // Client id
	'qwBXqYOFSpeOvibSRkkV8bT6', // Client Secret
	'https://developers.google.com/oauthplayground' // Redirect URL
);
oauth2Client.setCredentials({
	refresh_token:
		'1//044UQRFZWWu8dCgYIARAAGAQSNwF-L9IrpV7QinshTlbmHoXD4QLWR5LCrpwfU5ewjIcNwyvBY8TVSljj6M9dTvfvn8ZgVykdIPk',
});
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: 'info@acolab.org',
		clientId:
			'1047201258535-072t7sqlg9bicd3n6bts74ltdq1g3819.apps.googleusercontent.com',
		clientSecret: 'qwBXqYOFSpeOvibSRkkV8bT6',
		refreshToken:
			'1//044UQRFZWWu8dCgYIARAAGAQSNwF-L9IrpV7QinshTlbmHoXD4QLWR5LCrpwfU5ewjIcNwyvBY8TVSljj6M9dTvfvn8ZgVykdIPk',
		accessToken: accessToken,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

router.post('/subscribemail', auth, (req, res) => {
	user
		.findById(req.user.id)
		.exec()
		.then((user) => {
			const mailOptions = {
				from: 'info@acolab.org',
				to: user['email'],
				subject: 'Node.js Email with Secure OAuth',
				generateTextFromHTML: true,
				html: '<b>test</b>',
			};

			smtpTransport.sendMail(mailOptions, (error, response) => {
				error ? console.log(error) : console.log(response);
				smtpTransport.close();
			});
		})
		.catch();
});

router.post('/webinarreminder', auth, (req, res) => {
	user
		.find({})
		.exec()
		.then((user) => {
			for (var i = 0; i < user.length; i++) {
				const mailOptions = {
					from: 'info@acolab.org',
					to: user[i]['email'],
					subject: ' Joining details for ' + req.body.webinartitle,
					generateTextFromHTML: true,
					html:
						`Dear CoLaborator,
					Thank you for registering for our webinar on ` +
						req.body.title +
						`. 
					This is to remind you that the webinar will be held today at ` +
						req.body.time +
						`. The joining link will be activated at (1 hour before the scheduled time) and will be available under the SharEd tab in your ACoLab account.  
					Let’s learn together. See you soon, Fellow CoLaborator.
					Keep Learning, Sharing, Innovating and CoLaborating.
					
					Team A CoLab
					Community | Webinars | Hackathons
					Mail ID: info@acolab.org
					Know more about us:
					Facebook Github Instagram
					LinkedIn Twitter YouTube`,
				};

				smtpTransport.sendMail(mailOptions, (error, response) => {
					error ? console.log(error) : console.log(response);
					smtpTransport.close();
				});
			}
			res.json({ message: 'all send' });
		})
		.catch();
});

function generateOTP() {
	return Math.floor(Math.random() * (999999 - 100000) + 100000);
}
router.post('/sendotp', (req, res) => {
	user
		.findOne({ email: req.body.email })
		.exec()
		.then((user) => {
			const otp = generateOTP();
			const mailOptions = {
				from: 'info@acolab.org',
				to: user['email'],
				subject: 'Reset Password',
				generateTextFromHTML: true,
				html: `Your OTP to reset your password is ${otp}`,
			};

			smtpTransport.sendMail(mailOptions, (error, response) => {
				error ? console.log(error) : console.log(response);
				smtpTransport.close();
			});
			const userotp = new OTP({ email: user['email'], otp: otp });
			userotp.save();
			res.status(200).json({ message: 'done' });
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.post('/sendotpsignup', (req, res) => {
	console.log('asde')
	user
		.findOne({ email: req.body.email })
		.exec()
		.then((user) => {
			console.log(user)
			if(user!=null){
				res.status(400).json({msg:"user already registered"});
			}else{
				console.log('else')
			const otp = generateOTP();
			const mailOptions = {
				from: 'info@acolab.org',
				to: req.body.email,
				subject: 'Verify Email',
				generateTextFromHTML: true,
				html: `Your OTP to verify email is ${otp}`,
			};

			console.log(otp)
			const userotp = new OTP({ email: req.body.email, otp: otp });
			OTP.findOne({email:req.body.email}).then((result)=>{
				if(result!=null){
					res.status(200).json({ msg: 'already sent' });
				}else{
					smtpTransport.sendMail(mailOptions, (error, response) => {
						error ? console.log(error) : console.log(response);
						smtpTransport.close();
					});
					userotp.save().then((result)=>{res.status(200).json({ msg: 'done' });});
					
				}
			})
		}
		})
		.catch((err) => {
			res.status(400).json({msg:err});
		});
});

module.exports = router;
