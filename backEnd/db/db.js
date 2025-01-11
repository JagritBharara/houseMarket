const mongoose = require('mongoose');


const connectToDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Runnig');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectToDb;