require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const authroutes = require('./routes/authroutes')
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')
const app = express();
const path = require("path")  //for buid project

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend/build')))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})


// routes 
app.use('/api/user',authroutes);
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)

app.use("*", function(req,res) {
    res.sendFile(path.join(__dirname,  "./frontend/build/index.html"))
})

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log('connected to database and listening on port ', process.env.PORT)
    }) 
})
.catch((error)=> {
    console.log(error)

})



