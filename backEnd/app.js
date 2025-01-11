const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/userRoute')
const cookieParser = require('cookie-parser');
const propertyRoute = require('./routes/propertyRoute');

connectToDb();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// const PORT = 3000;
app.get('/',(req,res)=>{
    res.send("Lets Begin");
})
app.use('/users',userRoutes);
app.use('/property',propertyRoute)


module.exports = app;