const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../backend/models/userModel")

/**we have to protect our route for some cases , lets say for the private functions like getting user data when particular user logs in 
the way we do it is we create a custom middleware as middleware is a function that runs during the response cycle , 
so when we send a route or some request to the endpoint the custom (middleware)  gonna validate the JWT token  
**/
const protect = asyncHandler(async (req, res , next)=>{ //since this is a middle ware this async function will take 3 parameters
    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) { //checking if the header authorization exists and starts with bearer
        // there token is combned with bearer , it will be like this : token = "Brearer sometokens"
        try {
            //get token from bearer
            // with split bearer and token will be splited into array
            //and with index of 1 we will collect the token from the array
            token = req.headers.authorization.split(' ')[1]

            //verify token 
            const  decodedToken = jwt.verify(token, process.env.JWT_SECRET) 
            
            //get user from the token 
            req.user = await User.findById(decodedToken.id).select("-password")// i dont want pasword   
            next()
        } catch (error) {
            res.status(401)
            throw new Error ('not authorized ')
        }
    }

        if (!token) {
            res.status(4001)
            throw new Errpr("Not authorized , no token ")
            
        }
} )  


module.exports= {protect}