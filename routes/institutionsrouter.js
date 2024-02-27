const express = require('express');
const {postinstituionssignup,
  postInstitutionslogin,
  getInstitutionsStudents} = require('../controllers/institutionscontrollers');
const router = express.Router();
router.post('/signup', postinstituionssignup);
router.post('/login', postInstitutionslogin);
router.get('/getshowstudents', getInstitutionsStudents);


module.exports = router;
