const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async(req,res) => {
    if(error) {
        return res.status(400),send(error.details[0].message);
    }
    
    //check if the user exists or not
    let user = await User.findOne({email: req.body.email});
    if(user) {
        // If user exists
        return res.status(400).send('Success');
        //adding the user to the specific hackathon
        HackaMentor = new User({
            name: req.body.name,
            email: req.body.email
        });
        await HackaMentor.save();
        res.send(HackaMentor);
        
    } else{
        //to be redirected to registration or create new user
        res.redirect('/register');
    }
}); 
module.exports = router;