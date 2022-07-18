

//@desc Get goals
//@route GET /api/goals
// @access  Private
const getGoal = (req, res)=>{
    res.status(200).json({message: "Get goals"})

}


//@desc Set goals
//@route Post /api/goals
// @access  Private
const setGoal = (req, res)=>{
    if (!req.body.text) {
        res.status(400)
        throw new Error ('please add a text in a field ')
    }
    
    res.status(200).json({message: "Create goals"})
}


//@desc Update goals
//@route PUT /api/goals/:id
// @access  Private
const updateGoal = (req, res)=>{
    res.status(200).json({message: `Update goals ${req.params.id}`})

}


//@desc Delete goals
//@route DELETE /api/goals/:id
// @access  Private
const deleteGoal = (req, res)=>{
    res.status(200).json({message: `Delete goals ${req.params.id}`})
}

module.exports = {

    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}