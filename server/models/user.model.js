const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true, "Username is Required"],
    },

    email:{
        type: String,
        required: [true, "Email is Required"],
    },

    password:{
        type: String,
        required: [true, "Password is Required"],
        minLength: [8, "Password must be at least 8 characters"]
    }

}, {timestamps: true})




// Virtual field: stores info from req, but not saved to the collection/DB (need confirmation pass, but not storing it)
// #1 Create confirmPassword and set it equal to value
UserSchema.virtual("confirmPassword")
    .get(()=> this._confirmPassword)
    .set((value)=> this._confirmPassword = value)

// https://mongoose.js.com/docs/middleware.html#pre
// https://mongoose.js.com/docs/middleware.html
// middleware affects/aides in the middle of a process

User.Schema.pre("validate", function(next) {
    console.log("in validate");

    if (this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match");
    }
    next()
})

UserSchema.pre("save", function(next) {
    console.log("in pre save");

    bcrypt.hash(this.password,10)
        .then((hashedPassword)=>{
            console.log("in hash");
            this.password = hashedPassword;
            next();
        })

})




// MODEL: 1. collectionName: name that is held in the DB - 2. Schema: singular of what is plural in the DB
const User = mongoose.model("User", UserSchema);
// This returns a user model with the collection name and that schema

module.exports = User;