// StAuth10222: I Hruthvik Chokshi, 000813765 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const express = require('express');
var router = express.Router()
const UserModel = require('../models/Users.js')

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  
  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
    let uname = req.body.username;
    let pword = req.body.password;

    // await UserModel.getLoginCred(uname,pword);
    const ur = await UserModel.getLoginCred(uname,pword);
    
    let datauname = ur[0].username;
    let dataupass = ur[0].password;
    let dataulevel = ur[0].level;

  // is the username and password OK?
  if ( uname == datauname &&
       pword == dataupass)
  {
    // set a session key username to login the user
    req.session.username = datauname;
    req.session.level = dataulevel;

    if(dataulevel == "member"){
    // re-direct the logged-in user to the members page
    res.redirect("/members");
    }
    else{
      res.redirect("/editors");
    }
  }
  else if(req.body.username == "" && req.body.password == ""){
    req.session.login_error = "username/password cannot be blank!";
    res.redirect("/login");
  }
  else
  {
    // if we have an error, reload the login page with an error
    req.session.login_error = "Invalid username and/or password!";
    res.redirect("/login");
  }

});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
  delete(req.session.username);
  res.redirect("/home");
});

module.exports = router;
