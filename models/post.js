const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://vinaysemwal392:yoJQwedQurx6cY19@myproject1.bnmyhii.mongodb.net')

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