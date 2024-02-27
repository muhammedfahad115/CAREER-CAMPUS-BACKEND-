const express = require('express');
const {postcompaniessignup} = require('../controllers/companiescontrollers');
// eslint-disable-next-line new-cap
const router = express.Router();
router.post('/signup', postcompaniessignup);
module.exports = router;
