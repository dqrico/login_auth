const mongoose = require("mongoose");



const dbName = "logreg";


mongoose.connect("mongodb+srv://davidqrico:gloZRMIKsjK5JtyO@cluster0.iv4ksfe.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log(`Connected to the database called ${dbName}`)
    })
    .catch((err)=>{
        console.log(`error connecting to ${dbName}. Error:`,err)
    })