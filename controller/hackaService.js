const express = require('express');
const User = require('../model/user');
const router = express.Router();
const Hackathon = require("../model/hackathon");

const hackaMentor = async(req,res,next)=>{
    var user_id;
    var user;
    
        await Hackathon.findOneAndUpdate({id:req.body.hackathonid},{
				$push:{Mentorlist: {_id:req.user.id},}
			}).then().catch();
		
		res.status(200).json({message:'You are added to the hackathon'});
	
}

//adding hackathon to user's list
const addHacka = async (req,res,next)=>{
  var user;
  var Hacka={
    "hackathonid":req.body.hackathonid,
    "roll":'Mentor'
  }
  User.findById(req.user.id,function(err,data){
        if(err){
            return err
        }else{
      User.update(
        {_id: req.user.id}, {
          $push:{hackathonList:Hacka}
        },function(err,num,res){
            //error
        }
      );
      res.status(200).json({
        message:'Hackathon added to your profile'
      });
    }
  });
}

const NullifyHacka = async (req,res,next)=>{
  var user;
  var Hacka={
    "hackathonid":req.body.hackathonid,
    "roll":'null'
  }
  
  User.findById(req.user.id,function(err,data){
        if(err){
            return err
        }else{
      User.update(
        {_id: req.user.id}, {
          $push:{hackathonList:Hacka}
        },function(err,num,res){
            //error
        }
      );
      // res.status(200).json({
      //   message:'Your participation is canceled'
      });
    }
  });
  //remove the user from hackathon list
  await Hackathon.findOneAndUpdate({id:req.body.hackathonid},{
    findOneAndDelete
  }).then().catch(err) {
    res.status(500).send("error in doing changes")
  };
  res.status(200).json({
    message:'Your participation is canceled', 
}

module.exports = {
    //updateMProfile:updateMProfile,
    hackaMentor:hackaMentor,
    addHacka:addHacka,
    NullifyHacka:NullifyHacka
};