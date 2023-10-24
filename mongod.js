const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://deadly7036:deadly7036@cluster0.iezdyjg.mongodb.net/YouTube?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
     email:String,
     password:Number
});

module.exports = mongoose.model("User",userSchema);