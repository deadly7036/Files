const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://:@cluster0.iezdyjg.mongodb.net/YouTube?retryWrites=true&w=majority");
const encrypt = require('mongoose-encryption');
const userSchema = new mongoose.Schema({
     email:String,
     password:Number
});
const mySecret = process.env['SECRET']
userSchema.plugin(encrypt, { secret: mySecret,encryptedFields: ['password']});

module.exports = mongoose.model("User",userSchema);