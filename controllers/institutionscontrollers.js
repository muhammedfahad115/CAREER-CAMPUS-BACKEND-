const institutions = require('../models/institutionsSchema')
const bcrypt = require('bcrypt')

let institutionsObject = {
    postinstituionssignup : async(req,res)=>{
        const {firstName,lastName,email,password} = req.body
        let existingInstituions = await institutions.findOne({ email : email})
        if(existingInstituions){
            return res.status(400).json({ error : 'You already have an account. Please login.'})
        }else{
            const hashedPassword =  await bcrypt.hash(password,10)
        console.log(firstName,lastName,email,hashedPassword)
        const newInstitutions = new institutions({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashedPassword
        })
        newInstitutions.save()
        return res.json({message : 'Signup successfull'})
        }
    }
}

module.exports = institutionsObject