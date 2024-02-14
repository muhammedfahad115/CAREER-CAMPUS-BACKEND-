const express = require('express')
const { postinstituionssignup } = require('../controllers/institutionscontrollers')
const router = express.Router()
router.post('/signup', postinstituionssignup)

module.exports = router