const express = require('express')
const { postcompaniessignup } = require('../controllers/companiescontrollers')
const router = express.Router()
router.post('/signup', postcompaniessignup)

module.exports = router