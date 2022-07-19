/**since we are woking with error handles we wont use async await try catch 
 * cuz we will be using  asyncHandler from express
 */
const asyncHandler= require("express-async-handler")

//@desc Get goals
//@route GET /api/goals
// @access  Private
const getGoal = asyncHandler(async (req, res)=>{
    res.status(200).json({message: "Get goals"})

})


//@desc Set goals
//@route Post /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res)=>{
    if (!req.body.text) {
        res.status(400)
        throw new Error ('please add a text in a field ')
    }
    
    res.status(200).json({message: "Create goals"})
    console.log(req.body);
})


//@desc Update goals
//@route PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res)=>{
    res.status(200).json({message: `Update goals ${req.params.id}`})

})


//@desc Delete goals
//@route DELETE /api/goals/:id
// @access  Private
const deleteGoal =asyncHandler( async (req, res)=>{
    res.status(200).json({message: `Delete goals ${req.params.id}`})
})

module.exports = {

    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
} 