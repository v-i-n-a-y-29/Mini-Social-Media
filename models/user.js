const mongoose=require('mongoose')
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.DATABASE_URL)

let userSchema= mongoose.Schema({
    name:String,
    username:String,
    email:String,
    age:Number,
    password:String,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
})

module.exports= mongoose.model('user',userSchema)