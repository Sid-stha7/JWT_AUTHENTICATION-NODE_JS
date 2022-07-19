const express = require("express")
const dotenv = require ("dotenv").config()
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000
const { errorHandler } = require("../middleware/errorMiddleware")

const app = express()

//middleware 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** since the error handler is middleware we have to use it as middleware so that will replace default 
    express error handler
**/
app.use(errorHandler)


//route
app.use("/api/goals", require("../routes/goalRoutes"))
app.listen(port,()=>{

    console.log(`server started on ${port}`);
})