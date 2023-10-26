//jshint esversion:6
const express = require("express");
const app = express();
const session = require('express-session')
const findOrCreate = require('mongoose-findorcreate')
const bodyParser = require("body-parser");
const passport = require('passport');
app.use(bodyParser.urlencoded({ extended: true }));
const GoogleStrategy = require("passport-google-oauth20");
app.use(express.json());
app.use(express.static("public"));
;
app.use(session({
  secret: process.env['Mongo'],
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

const User_ = require("./mongod.js");


passport.use(User_.createStrategy());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://nodejs-24.mashoaib.repl.co/auth/google/secrets"
},
  function(accessToken, refreshToken, profile, cb) {
    User_.findOrCreate({ googleId: profile.id }, function(err, user) {
      return cb(err, user);
    });
  }
))
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/secrets');
  });
app.get("/", (req, res) => {
  res.render("home.ejs")
})
app.get("/register", (req, res) => {
  res.render("register.ejs")
})
app.get("/login", (req, res) => {
  res.render("login.ejs")
})
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return err;
    res.redirect("/");
  });

})

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs")
  } else {
    res.render("login.ejs")
  }
})







app.post('/register', async (req, res) => {
  User_.register({ username: req.body.username }, req.body.password, function(err, user) {
    if (err) {
      console.log(err)
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect("/secrets")
      })
    }
  })
});
app.post('/login', async (req, res) => {
  const user = new User_({
    username: req.body.username,
    password: req.body.password
  })
  req.login(user, function(err) {
    if (err) {
      console.log(err)
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect("/secrets")
      })
    }
  })
})




app.listen("7500", () => {
  console.log("server is running");
})