const express = require('express')
const { postStudentsignup, postStudentlogin, postdecodedtoken } = require('../controllers/studentscontrollers')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
router.post('/signup', postStudentsignup)
router.post('/login',postStudentlogin)

// router.post('/get-user-profile', verifyToken , getProfile)

module.exports = router

