// StAuth10222: I Hruthvik Chokshi, 000813765 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const express = require('express');
var router = express.Router()
const UserModel = require('../models/Users.js')

router.get("/", async function(req, res)
{  
    req.TPL.signup_error = req.session.signup_error;
    req.session.signup_error = ""; 
    req.TPL.signup_message = req.session.signup_message;
    req.session.signup_message = ""; 
  // render the signup page
  res.render("signup", req.TPL);
});
router.post("/attemptsignup", async function(req, res)
{
    let unlength=req.body.username;
    let unlength1 = (unlength.length);
    let uplength =req.body.password;
    let uplength1=(uplength.length);
    console.log(unlength);
    console.log(unlength1);

    if (unlength1 == 1 && uplength1 == 1){
        req.session.signup_error = "Invalid username and/or password!";
        res.redirect("/signup");
    }
    else if(req.body.username == "" && req.body.password == "")
    {
        req.session.signup_error = "username/password cannot be blank!";
        res.redirect("/signup");
    }
    else
    {
        await UserModel.createUser(req.body);
        req.session.signup_message = "User successfully created!";
        res.redirect("/signup");
    }
    
    

});
module.exports = router;