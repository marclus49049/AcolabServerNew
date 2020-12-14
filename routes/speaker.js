const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const Webinar = require('../model/webinar');
const User = require('../model/user');
const Speaker = require('../model/speaker');
const Auth = require('../middleware/auth')

router.post('/addspeaker', Auth, async (req, res) => {
	User.findByIdAndUpdate(req.user.id,{
		qualification:req.body.qualification,
		socialMediaLinks:req.body.socialMediaLinks,
		$push: { speakerWebinar: {id:req.body.speakerWebinar,title:req.body.title }},
	}).then((result)=>{
		res.status(200).json({message:"Speaker has been added"})
	}).catch((err)=>{
		res.status(400).json({message:"Couldnt add Speaker"})
	});
});


module.exports = router;
