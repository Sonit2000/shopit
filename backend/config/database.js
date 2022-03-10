const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL,()=>{
        console.log("Database connect!");
    })
}
module.exports = connectDatabase;