const mongoose=require("mongoose")

var mongoURL='mongodb+srv://saideeppp:Saideep20644@cluster0.zends9t.mongodb.net/mern-food'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})

var db=mongoose.connection

db.on('connected',()=>{
    console.log('Mongo DB Connection Successfull')
})

db.on('error',()=>{
    console.log("Mongo DB connection failed")
})

module.exports = mongoose