const express = require("express")
const { registerUser, loginUser, getMe } = require("../controllers/userController")
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")
router.post('/',registerUser)

router.post('/login',loginUser)
router.get('/me',protect ,getMe) // i want to protect this so i will use the protect function from middleware 

module.exports = router