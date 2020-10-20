const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const webinar = require('../model/webinar');

router.post('/addwebinar',async(req,res)=>{
	var newwebinar=new webinar({
		title:req.body.title,
		speaker:req.body.title,
		description:req.body.title,
		link:req.body.link,
		action:req.body.action,
		date:req.body.date,
	});
	await newwebinar.save().then(res.json(newwebinar));
});

module.exports= router;