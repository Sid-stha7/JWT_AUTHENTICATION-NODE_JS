const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require ("../backend/models/userModel")

//@desc register user
//@route POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email})
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id) 
        /* the id we got from the user which is registered is passed to the generateToken function 
        which is (id) parameter 
        **/
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  

//@desc authenticate user
//@route POST /api/login
// @access  public
const  loginUser= asyncHandler(async (req, res)=>{
    const {email, password}= req.body //get email and password from body 
    
    //check for user email
    const user = await User.findOne({email})

    //authenticate with database
    /**the password is hashed so inorder to compare the password we have method called compared from bcrypt module  
     * bcrypt compare methods takes two arguments that is password that user inputs and password thats hashed*/ 
    if (user &&(await bcrypt.compare(password, user.password))) {
        
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials ')
    }

    res.json({message: "login user"})

})
//@desc get user data 
//@route GET /api/users/me
// @access  private
const  getMe= asyncHandler (async (req, res)=>{

    const {_id, name, email} = await User.findById(req.user.id) //the id will be fetched from the middle ware which is JWT token 

    
    res.status(200).json({
      id: _id,
       name,
       email,
      
  })
})

//generate JWT
/**the token is generated from the user id that we are getting and passed to the function 
 * the jwt has a method called sign which takes two major arguments they are user id and the jwt_secret key/ private key
 * which is set in our env folder 
 * the exipres in propert does the job to expire the token in certain time 
 */
const generateToken = (id)=>{ 
    return jwt.sign(
        {id},
        process.env.JWT_SECRET, 
        {expiresIn : '30d'},
        )
}
module.exports= {
    registerUser,
    loginUser,
    getMe,
    generateToken
}

