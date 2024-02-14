const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
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

const employees = new mongoose.model('employeescollection',employeesSchema)

module.exports = employees