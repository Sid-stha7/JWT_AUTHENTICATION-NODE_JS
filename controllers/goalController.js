const Goal = require ("../backend/models/goalModel")

/**since we are woking with error handles we wont use async await try catch 
 * cuz we will be using  asyncHandler from express
 */
const asyncHandler= require("express-async-handler")

//@desc Get goals
//@route GET /api/goals
// @access  Private
const getGoal = asyncHandler(async (req, res)=>{
    const goals = await Goal.find() /**here what we did is we first imported out models then from the models which is 
    in mongo db we ahave find method find() can find from user or id or whatever we want  */

    res.status(200).json(goals)
    console.log("Got goals from database");
    // res.status(200).json({message: "Get goals"})

})


//@desc Set goals
//@route Post /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res)=>{
    if (!req.body.text) {
        res.status(400)
        throw new Error ('please add a text in a field ')
    }
    
    const goals = await Goal.create({/**in order to set goals we hace create() function**/
        text : req.body.text 
    }) 

    res.status(200).json(goals)
    console.log("fetched goals from database ");
    res.status(200).json({message: "Create goals"})
    console.log(req.body);
})


//@desc Update goals
//@route PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res)=>{

    const goal = Goal.findById(req.param.id) /**here goals will fetch id from url and then will get that particular id data/** */
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    /**in this line whats happening is that we will find and update by the id of the 
     * data  the method findByIdAndUpdate will take two argument one is from where id is coming and 
     * what to update  new: true proporty will make the new one if there is no item of that goal
     */
    res.status(200).json(updateGoal)
    
    console.log(`updated goal of id ${req.params.id}`);

})


//@desc Delete goals
//@route DELETE /api/goals/:id
// @access  Private
const deleteGoal =asyncHandler( async (req, res)=>{

    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found so cant be deleted')
    }

    await goal.remove()
    res.status(200).json({id :req.params.id})
    console.log(`deleted item of id: ${req.params.id}`);
})

module.exports = {

    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
} 