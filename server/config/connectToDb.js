

const mongoose = require('mongoose');

async function connectToDb(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Conneced to Database")   
    } catch (err) {
         console.log(err)
    }


 }

 module.exports=connectToDb