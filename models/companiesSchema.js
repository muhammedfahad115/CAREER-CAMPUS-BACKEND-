const mongoose = require('mongoose')

const companiesSchema = new mongoose.Schema({
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

const companies = new mongoose.model('companiescollection',companiesSchema)

module.exports = companies