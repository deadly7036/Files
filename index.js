//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User_ = require("./mongod.js")
const saltRounds = 1;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
;

app.get("/", (req, res) => {
  res.render("home.ejs")
})
app.get("/register", (req, res) => {
  res.render("register.ejs")
})
app.get("/login", (req, res) => {
  res.render("login.ejs")
})

// level 1 
app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
    if (err) return res.send(err)
    const user = new User_({
      email: req.body.username,
      password: hash
    });
    await user.save();
    res.render("secrets.ejs")
  });

});
app.post("/login",async(req,res)=>{
  
    const username = req.body.username;
    const password = req.body.password;
    const user = await User_.findOne({email:username});
bcrypt.compare(password,user.password, function(err, result) {
    if(result == true){
      res.render("secrets.ejs");
      } if(err) 
    console.log(err)
});
   
});


  










app.listen("4000");