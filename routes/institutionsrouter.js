const express = require('express');
const {postinstituionssignup,
  postInstitutionslogin,
  getInstitutionsStudents,
  getbalancestudents} = require('../controllers/institutionscontrollers');
const router = express.Router();
router.post('/signup', postinstituionssignup);
router.post('/login', postInstitutionslogin);
router.get('/getshowstudents', getInstitutionsStudents);
router.get('/getbalancestudents', getbalancestudents);


module.exports = router;
