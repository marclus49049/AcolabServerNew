const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const webinar = require('../model/webinar');

router.post('/addwebinar',auth, async (req, res) => {
	// console.log(req.body)
	var newwebinar = new webinar({
		title: req.body.title,
		speaker: req.body.speaker,
		description: req.body.description,
		topicDescription: req.body.topicDescription,
		link: req.body.link,
		action: req.body.action,
		date: req.body.date,
		status: req.body.status,
		designation:req.body.designation,
		preferredCaption:req.body.preferredCaption,
		preknowledge:req.body.preknowledge,
		category:req.body.category
	});
	await newwebinar.save().then((result)=>{
		res.status(200).json(result)
	}).catch((err)=>{
		console.log(err)
		res.status(400).json({message:"error occured"})
	});
});

router.post('/updatewebinar', auth,async (req, res) => {
	webinar
		.findOneAndUpdate(
			{ _id: req.body.id },
			{
			title: req.body.title,
			speaker: req.body.speaker,
			description: req.body.description,
			topicDescription: req.body.topicDescription,
			link: req.body.link,
			action: req.body.action,
			date: req.body.date,
			status: req.body.status,
			designation:req.body.designation,
			preferredCaption:req.body.preferredCaption,
			preknowledge:req.body.preknowledge,
			category:req.body.category
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
