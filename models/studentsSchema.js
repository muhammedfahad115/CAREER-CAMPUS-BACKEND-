
const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true 
    }
})

const students = new mongoose.model('StudentCollection',studentsSchema)

module.exports = students