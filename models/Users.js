// StAuth10222: I Hruthvik Chokshi, 000813765 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
}

startup();  

async function getLoginCred(uname,pword)
{
  const results = db.all("SELECT * FROM Users where username=? And password=?",[uname,pword]);
  return results;
}
async function getAllUser(){
  const resultu = db.all("SELECT * FROM Users");
  return resultu;
}
async function createUser(userN)
{ 
  await db.run("INSERT INTO Users VALUES (?,?,?)",[userN.username,userN.password,"member"]);  
}

async function deleteUser(userNa){
  await db.run("DELETE FROM Users where username=?",userNa);
}

module.exports = {getLoginCred,createUser,getAllUser,deleteUser};