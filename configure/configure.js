const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('Database is connected')
    }).catch(()=>{
        console.log("Error while connecting to DB")
    })
}
module.exports = connectDB