require('dotenv').config();
const express=require('express')
const app=express()
const cookieparser=require('cookie-parser')
const userModel=require('./models/user')
const postModel=require('./models/post')
const bcrypt=require('bcrypt')
const path = require('path');
const jwt=require('jsonwebtoken')
const post = require('./models/post')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/home' , isLoggedIn ,async function(req,res){
    let posts = await postModel.find({}).populate('user');
    res.render('home', {posts,user:req.user})
})

app.get('/home/like/:id' ,isLoggedIn, async function (req,res) {
    let post=await postModel.findOne({_id:req.params.id}).populate('user')
    if(post.like.indexOf(req.user.userid)==-1)
    {
        post.like.push(req.user.userid)
    }
    else
    {
        post.like.splice(post.like.indexOf(req.user.userid),1)
    }
    await post.save()
    res.redirect('/home')
})

app.get('/like/:id' ,isLoggedIn,async function(req,res){
    let post=await postModel.findOne({_id:req.params.id})  // No need to populate here
    // console.log(req.user)
    if(post.like.indexOf(req.user.userid)==-1)
    {
        post.like.push(req.user.userid)
    }
    else
    {
        post.like.splice(post.like.indexOf(req.user.userid),1)
    }
    await post.save()
    res.redirect('/profile')
})

app.get('/edit/:id' ,isLoggedIn,async function(req,res){
    let post=await postModel.findOne({_id:req.params.id})  // No need to populate here
    // console.log(req.user)
    res.render('edit',{post})
})

app.post('/update/:id' ,isLoggedIn,async function(req,res){
    await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})  // No need to populate here
    // console.log(req.user)
    res.redirect('/profile')
})

app.post('/register', async (req,res)=>{
    let {name,email,age,username,password}= req.body
    // console.log(req.body)
    let user=await userModel.findOne({email:email})
    // console.log({user:user})
    if(user)
        return res.status(500).send('user already registered')
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user=await userModel.create({
                name:name,
                username:username,
                email:email,
                age:age,
                password:hash
            })
            let token=jwt.sign({email:email,userid:user._id}, process.env.JWT_SECRET)
            res.cookie('token',token)
            res.redirect('/login')
        })
    })
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login', async (req,res)=>{
    let {email,password}= req.body
    let user=await userModel.findOne({email:email})
    if(!user)
        return res.status(500).send('smth went wrong')
    
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result) {
            let token=jwt.sign({email:email,userid:user._id}, process.env.JWT_SECRET)
            res.cookie('token',token)
            res.redirect('/profile')
        }
        else res.redirect('/login')
    })
})

app.get('/profile' , isLoggedIn ,async function(req,res){
    // console.log(req.user);  // Will show {email: "...", userid: "..."}
    // res.send(`Welcome to your profile! Email: ${req.user.email}`)
    let user = await userModel.findOne({email:req.user.email})
    await user.populate('posts')  // Need to await this!
    console.log(user)
    res.render('profile' , {user})

})

app.post('/post' , isLoggedIn ,async function(req,res){
    // console.log(req.user);  // Will show {email: "...", userid: "..."}
    // res.send(`Welcome to your profile! Email: ${req.user.email}`)
    let user = await userModel.findOne({email:req.user.email})
    
   let post= await postModel.create({
        content:req.body.content,
        user:user._id,
    })

    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})

app.get('/logout' , function(req,res){
    res.cookie('token' , "")
    res.redirect('/login')
})

function isLoggedIn(req,res,next){
    if(!req.cookies.token || req.cookies.token === '')
        res.redirect('/login')
    
    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)//data will contain the email and userid
        req.user = data  // Better practice: use req.user instead of req.body
        next()
    } catch(err) {
        return res.send('Invalid token')
    }
}

app.listen('3000', function(req,res){
    console.log("app chal raha hai")
})