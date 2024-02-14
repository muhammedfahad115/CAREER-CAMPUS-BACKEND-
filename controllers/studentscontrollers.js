const students = require('../models/studentsSchema')
const studentsSchema = require('../models/studentsSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const secretKey = process.env.JWT_SECRET

let studentsObject = {
    postStudentsignup : async(req,res)=>{
        const {firstName,lastName,email,password} = req.body
        let existingStudents = await students.findOne({ email : email})
        if(existingStudents){
            return res.status(400).json({ error : 'You already have an account. Please login.'})
        }else{
            const hashedPassword =  await bcrypt.hash(password,10)
        console.log(firstName,lastName,email,hashedPassword)
        const newStudent = new students({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashedPassword
        })
        newStudent.save()
        return res.json({message : 'Signup successfull'})
        }
    },
    postStudentlogin : async(req,res)=>{
        const {email,password} = req.body
        try {
            const student = await students.findOne({email})
            if(!student){
                return res.status(401).json({ error : ' User not found'})
            }
            const passwordMatch = await bcrypt.compare(password,student.password)
            if(!passwordMatch){
                return res.status(401).json({ error : 'Password is Incorrect'})
            }
            if( student && password){
                const token = jwt.sign({ email : student.email},secretKey,{ expiresIn : '1m'})
                res.cookie( 'jwtToken' , token ,{ httpOnly : true , maxAge : 60})
                return res.status(200).json({ success: true, message: 'Login successful', token });

            }
        }catch(error){
            console.log('error has occured:',error)
            res.status(500).json({ error : 'Internal server error'})
        }
        },
        
}

module.exports = studentsObject