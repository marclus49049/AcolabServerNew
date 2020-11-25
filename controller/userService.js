// import {v4 as uuidv4} from 'uuid';
// import { default as expressValidator} from "express-validator";
// import {default as bcrypt} from 'bcryptjs';
// import {default as jwt } from 'jsonwebtoken';
// import User from '../model/user.js';  
// import {default as userSubSchema} from '../model/userSub.js';
const uuidv4 = require('uuid');
const expressValidator = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const userSubSchema = require('../model/userSub');
const { schema } = require('../model/user');
const Webinar=require('../model/webinar');

const {validationResult} = expressValidator

// register a user
const addUser = async (req, res,next) => {
  // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        first_name,
        last_name,
        email,
        password,
        contact
    } = req.body;

    try {
        let user = await User.findOne({
            $or:[
              {'email':email},
              {'contact':contact}
            ]
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            first_name,
            last_name,
            email,
            password,
            contact
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "secret", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
};
// login a user
const login = async (req, res,next) => {
  console.log(req.body)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
};

// get user details
const getUser = async (req, res,next) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id, 
        function (error, data) {
          res.json(data);
        }
      )
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }

};


const userSub = (req,res,next)=>{
  // console.log(req.user.id)
  const user = User.findById(req.user.id,function(err,data){
    // console.log(userSubSchema['sub_type']);
  // console.log(req.body.id);
  // console.log(userSubSchema['sub_type'][req.body.id]);
	if(req.body.id in userSubSchema['sub_type']){
		var d = new Date();
    var addition = userSubSchema['sub_type'][req.body.id]['days'];
    // console.log(d.getMonth());
    d.setDate(d.getDate() + addition);
    // console.log(d);
    var user_sub_info ={
      "plan_id":req.body.id,
      "current_plan":userSubSchema['sub_type'][req.body.id]["name"],
      "expire":d
    };
    User.update(
      {_id: req.user.id}, {
        sub_info: user_sub_info
      },
      function(err,num,res){
				// console.log(err)
				// console.log(num)
				// console.log(res)
				}
    );
    // console.log(user.path);
		res.json(data);
		// res.status(200).json(User.findById(req.user.id));

    }else{

      res.status(400).send('Invalid plan');

    }
  });
}


// 202 Already Registered
// 200 Registerd (First time)
// 201 User Not subbed
const deductCredit = (req,res,next)=>{
  d=new Date();
  d.setDate(d.getDate());
  var webinar=Webinar.findById(req.body.webinarid).then((result)=>{
    User.findById(req.user.id,function(err,data){
      if(err){
        return err
      }else{
        expiredate=data.sub_info['expire'];
        // console.log(d);
        if(expiredate>d){
          console.log('ok')
          if(data.webinarlist.includes(req.body.webinarid)){ // Send URL here name it meeting_url
            res.status(202).json({
              message:'Already registered for this webinar',
              action:null,
              meeting_url:result['link']
              // credits:user.credits
              }); 
          }else{
            User.findOneAndUpdate(
              {_id: req.user.id}, {
              credits:data['credits']-0, // AFTER USER SUB IS ENABLED CHANGES THIS TO -1
              $push:{webinarlist:req.body.webinarid}
              },
              function(err,num,res){
              // console.log(err)
              // console.log(num)
              // console.log(res)
              }
            )
            // .then(
              res.status(200).json({ // Send URL here
                message:'hope you learn something new',
                action:result['action'],
                meeting_url:result['link']
                // credits:user.credits
              })
            // );
          }
        }else{
          res.status(201).json({message:'not subscribed'})
        }
      }
    }
    );
  })

  // const user = 
	// if(req.body.username == user['username']){
  // console.log(User.findById(req.user.id)); 
  // User.update(
  //     {_id: req.user.id}, {
  //       credits: user.credits-1
  //     }
  //   );
	// 	res.status(200).json({
	// 		message:'hope you learn something new',
	// 		credits:user.credits
	// 	});
	// }else{
	// 	res.status(200).send('User not Found');
	// }
}




const leaderboard =async (req,res,next)=>{
  //score system
  const scoreSystem={
    "attendee_conceptual":1,
    "attendee_handson":2,
    "speaker_conceptual":5,
    "speaker_activity":5,
    "speaker_handson":10,
    "hackathon_submission":15,
    "hackathon_mentor":20,
    "colaboration_learner":15,
    "colaboration_mentor":30
  };
  try{
    var user = await User.findById(req.user.id)
	if(req.body.action==null){
		res.status(200).json({message:'already registered'});
	}
	if(req.body.action in scoreSystem){
      var score = user.leaderboard + scoreSystem[req.body.action]
      user.leaderboard = score
      User.findOneAndUpdate(
        {_id: req.user.id}, user,function(err,res){}
      );
      res.json(user);
    }else{
      res.status(400).json({message:'Invalid Action'});
    }
  }catch (e) {
    res.send({ message: "Error in Fetching user" });
  }	
}

const updateUserProfile = async (req,res,next)=>{
  var user;
  console.log(req.body);
  User.findById(req.user.id,function(err,data){
    if(err){
      return err
    }else{
      User.update(
        {_id: req.user.id}, {
          contact:req.body.contact,
          first_name:req.body.first_name,
          last_name:req.body.last_name,
        },function(err,num,res){
          // console.log(err)
          // console.log(num)
          // console.log(res)
        }
      );
      res.status(200).json({
        message:'hope you learn something new',
        // credits:user.credits
      });
    }
  });
}

const addorder = async (req,res,next)=>{
  var user;
  var order={
    "orderid":req.body.orderid
  }
  // console.log(req.body);
  User.findById(req.user.id,function(err,data){
    if(err){
      return err
    }else{
      User.update(
        {_id: req.user.id}, {
          $push:{orderlist:order}
        },function(err,num,res){}
      );
      res.status(200).json({
        message:'order added',
      });
    }
  });
}

const registerhackathon = async(req,res,next)=>{
	const teammembers=req.body.teammembers;
	var arr=[];
	var notfound=false;
	var email="";
	for(var i=0;i<teammembers.length;i++){
		email=teammembers[i]
		await User.find({email:teammembers[i]}).then(async(result)=>{
			if(result.length<1){
				// console.log(email)
				notfound=!notfound;
				// console.log('asd'+notfound)
				
			}else{
				arr.push(email)
			}
		}).catch((err)=>{
			// res.status(400).json({message:email,flag:notfound})
		})
	}
	// {
	// 	console.log(result[0])
	// 	await User.findByIdAndUpdate(result[0]._id,{
	// 		$push:{hackathonlist:req.body.hackathonid}
	// 	})
	// }
	// console.log('ghj'+notfound)
	if(notfound==false){
		for(var i =0;i<arr.length;i++){
			await User.findOneAndUpdate({email:arr[i]},{
				$push:{hackathonlist:{id:req.body.hackathonid,
                                      roll:'participant'}}
			}).then().catch();
		}
		res.status(200).json({emails:arr})
	}else{
		res.status(400).json({message:email,flag:notfound})
	}
}

// module.exports=addUser;
// module.exports=login;
// module.exports=getUser;
// module.exports=userSub;
// module.exports=deductCredit;
// module.exports=leaderboard;
module.exports = {
  addUser:addUser,
  login:login,
  getUser:getUser,
  userSub:userSub,
  deductCredit:deductCredit,
  leaderboard:leaderboard,
  updateUserProfile:updateUserProfile,
  addorder:addorder,
  registerhackathon:registerhackathon
};
