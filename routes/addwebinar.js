const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const webinar = require('../model/webinar');

router.post('/addwebinar', async (req, res) => {
	var newwebinar = new webinar({
		title: req.body.title,
		speaker: req.body.speaker,
		description: req.body.description,
		link: req.body.link,
		action: req.body.action,
		date: req.body.date,
		status: req.body.status,
	});
	await newwebinar.save().then(res.json(newwebinar));
});

router.post('/updatewebinar', async (req, res) => {
	webinar
		.findOneAndUpdate(
			{ _id: req.body.id },
			{
				title: req.body.title,
				speaker: req.body.speaker,
				description: req.body.description,
				link: req.body.link,
				action: req.body.action,
				date: req.body.date,
				designation: req.body.designation,
				status: req.body.status,
			},
			function (err, num, res) {
				// console.log(err)
				// console.log(num)
				// console.log(res)
			}
		)
		.then((data) => {
			res.status(200).json({
				// Send URL here
				message: 'Webinar Updated',
				update: data,
				// credits:user.credits
			});
		});
});

router.get('/getwebinar', async (req, res) => {
	var mysort = { date: 1 };
	var webinarlist = webinar
		.find({ status: 'upcoming' })
		.sort(mysort)
		.limit(4)
		.exec()
		.then((result) => {
			res.json({ webinars: result });
		})
		.catch();
});

module.exports = router;
