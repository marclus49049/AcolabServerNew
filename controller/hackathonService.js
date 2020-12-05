const express = require("express");
const User = require("../model/user");
const router = express.Router();
const Hackathon = require("../model/hackathon");

const registerMentor = async (req, res, next) => {
  if(!isRegistred(req.body.hackathonid, req.user.id)){
    var mentorObject = {
      hackathonid: req.body.hackathonid,
      roll: "mentor",
    };

    await Hackathon.findOneAndUpdate(
      { id: req.body.hackathonid },
      {
        $push: { userList: { id: req.user.id, roll: "mentor" } },
      }
    )
      .then((result) => {
        //
        User.findById(req.user.id, function (err, data) {
          if (err) {
            res.status(400).json({
              message: "Unable to find User",
            });
          } else {
            User.update(
              { _id: req.user.id },
              {
                $push: { hackathonList: mentorObject },
              },
              function (err, num, res) {
                //error
              }
            ).then((result) => {
              res.status(200).json({
                message: "Hackathon added to your profile",
              });
            });
          }
        });
      })
      .catch();
  }
};

const registerParticipant = async (req, res, next) => {
  if(!isRegistred(req.body.hackathonid, req.user.id)){
    const teammembers = req.body.teammembers;
    var arr = [];
    var notfound = false;
    var email = "";
    for (var i = 0; i < teammembers.length; i++) {
      email = teammembers[i];
      await User.find({ email: teammembers[i] })
        .then(async (result) => {
          if (result.length < 1) {
            // console.log(email)
            notfound = true;
            // console.log('asd'+notfound)
          } else {
            if(!checkIfRegistered(req.body.hackathonid, result["hackathonlist"], teammembers[i])){
              arr.push(email);
            }
          }
        })
        .catch((err) => {
          // res.status(400).json({message:email,flag:notfound})
        });
    }
    // {
    // 	console.log(result[0])
    // 	await User.findByIdAndUpdate(result[0]._id,{
    // 		$push:{hackathonlist:req.body.hackathonid}
    // 	})
    // }
    // console.log('ghj'+notfound)
    if (notfound == false) {
      for (let i = 0; i < arr.length; i++) {
        await User.findOneAndUpdate(
          { email: arr[i] },
          {
            $push: {
              hackathonlist: { id: req.body.hackathonid, roll: "participant" },
            },
          }
        )
          .then(
            result => {
              for (let i = 0; i < arr.length; i++) {
                Hackathon.findOneAndUpdate(
                  { id: req.body.hackathonid },
                  {
                    $push: { userList: { id: arr[i], roll: "participant" } },
                  }
                )
              }
            }
          )
          .catch();
      }
      res.status(200).json({ emails: arr });
    } else {
      res.status(400).json({ message: email, flag: notfound });
    }
  }
};

// Check user is registered
function isRegistred(hackathonID, userID) {
  User.findById(
    userID, function (err, data) {
      if(err){
        // TODO: ERROR
      }else{
        data["hackathonList"].forEach(
          userHackathon => {
            if(userHackathon["id"] == hackathonID && userHackathon["roll"] != "unRegistered"){
              res.status(400).json({
                message: "Already Registered for the Hackathon",
              });
              return true;
            } 
          }
        )
        return false; 
      }
    }
  )
}

// Checks if member is registered
function checkIfRegistered(hackathonID, list, email){
  list.forEach(
    userHackathon => {
      if(userHackathon["id"] == hackathonID && userHackathon["roll"] != "unRegistered"){
        res.status(400).json({
          message: `${email} is Already Registered for the Hackathon`,
        });
        return true;
      }
      return false;
    }
  )
}

module.exports = {
  registerMentor: registerMentor,
  registerParticipant: registerParticipant,
};
