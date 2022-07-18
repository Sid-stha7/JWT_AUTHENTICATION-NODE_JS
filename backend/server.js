const express = require("express")
const dotenv = require ("dotenv").config()
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000

const app = express()

//middleware 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//route
app.use("/api/goals", require("../routes/goalRoutes"))
app.listen(port,()=>{

    console.log(`server started on ${port}`);
})