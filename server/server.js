const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

app.use(cors())

require("./config/mongoose.config");
require("./routes/user.routes")(app);

app.listen(8000, ()=> console.log("Locked and Loaded on port 8000"));