const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//MongoDB compass connextion

// const dburl = "mongodb://localhost:27017/sdpprojectdata14"
// mongoose.connect(dburl).then(() => {
//     console.log("Connected to DB Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });


// mongo DB atlas connection
const dburl = "mongodb+srv://yugasaimanikanta:yugasai123@cluster0.urlzaaw.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburl).then(() => {
    console.log("Connected to MongoDB Atlas Successfully")
}).catch((err) => {
    console.log(err.message)
});



// const uri="mongodb://0.0.0.0:27017/muzicstreaming"; 
 
// mongoose.connect(uri); 
// const con=mongoose.connection; 
// con.on('open',()=> 
// console.log("Mangodb has connected") 
// ) 

const app = express() 
app.use(cors())
app.use(express.json())  // to parse JSON data

const adminrouter = require("./routes/adminroutes")
const customerrouter = require("./routes/customerroutes")
const managerrouter = require("./routes/managerroutes")

app.use("",adminrouter) // to include all admin routes
app.use("",customerrouter) // to include all job seeker routes
app.use("",managerrouter)// to include all recruiter routes

const port=2004
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})