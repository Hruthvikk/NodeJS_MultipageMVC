// StAuth10222: I Hruthvik Chokshi, 000813765 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const express = require('express');
var router = express.Router()

// Display the home page
router.get("/", async function(req, res)
{
  res.render("home", req.TPL);
});

module.exports = router;
