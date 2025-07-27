const mongoose = require('./db');

let postSchema= mongoose.Schema({
    content:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        default:Date.now()
    },
    like:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:'user'
        }
    ]
})

module.exports= mongoose.model('post',postSchema)