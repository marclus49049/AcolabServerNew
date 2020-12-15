const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const Webinar = require('../model/webinar');
const User = require('../model/user');
const Speaker = require('../model/speaker');
const Auth = require('../middleware/auth')

const storageprofile = multer.diskStorage({
	destination:function(req, file, cb){
		const userid = req.params.userid;
    		const path = `/home/admin/userdata/speaker/${userid}/profile`;
		fs.mkdirSync(path, { recursive: true });
		return cb(null, path);
	},
	filename:function(req, file, cb){
		cb(null, file.originalname);
	}
});

const uploadprofile = multer({
	// dest: './artisttype/',
	storage:storageprofile,
	limits:{
		fieldSize:1024 * 1024 * 30
	},
	// fileFilter:fileFilter
});

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

router.patch(
	'/profile/:userid',
	Auth,
	uploadprofile.single('profile'),
	async (req,res)=>{
		// console.log(req.body)
		if(req.file){
			// console.log(req.file);
			await User.findByIdAndUpdate(req.params.userid,{'profile':req.file}).exec().then(result=>{
				console.log(result);
				res.status(200).json({message:'profile added'});
			}).catch(err =>{
				res.status(400).json({message:err});
			});
		}
		else{
			res.status(400).json({message:'file not found'});
		}
	}
);

module.exports = router;
