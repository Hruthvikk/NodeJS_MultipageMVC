const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js');
// StAuth10222: I Hruthvik Chokshi, 000813765 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const UserModel = require('../models/Users.js');
// Display the editors page
router.get("/", async function(req, res)
{
  
  const results = await ArticlesModel.getAllArticles();
  const ur = await UserModel.getAllUser();
  req.TPL.userResults = ur;
  req.TPL.articles = results;
  res.render("editors", req.TPL);
});

router.get("/delete:username", async function(req,res){
  
  await UserModel.deleteUser(req.params.username);
  res.render("editors",req.TPL.userResults);
});

router.get("/articledelete:title", async function(req,res){
  // console.log(req.params.title);
  await ArticlesModel.deleteTitle(req.params.title);
   res.redirect("/editors");
});


module.exports = router;
