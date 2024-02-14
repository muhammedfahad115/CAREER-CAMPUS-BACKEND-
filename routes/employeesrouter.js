const express = require('express')
const { postemployeessignup } = require('../controllers/employeescontrollers')
const router = express.Router()
router.post('/signup', postemployeessignup)

module.exports = router