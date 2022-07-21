const mongoose = require ("mongoose")

const goalSchema = mongoose.Schema({
/**with every goal we have to know which user created that goal and is associated with that user
 * type will be object ID when created the user  
    reffrence will be User model from where that id is associated 
*/
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    text: {
        type : String,
        required : [true, 'please add a text value ']
    }
}, {
   timestamps: true 
})

module.exports = mongoose.model('GOAL', goalSchema)