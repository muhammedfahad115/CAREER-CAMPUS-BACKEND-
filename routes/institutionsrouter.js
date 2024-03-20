const express = require('express');
const {postinstituionssignup,
  postInstitutionslogin,
  getInstitutionsStudents,
  getbalancestudents,
  getSearchResult,
  getStudentMessage,
  postAddProfile,
  postInstitutionsMessage,
  getmessageinstitutions,
  postSentedMessage,
  postAddedImage} = require('../controllers/institutionscontrollers');
const {postPaymentObject} = require('../controllers/institutionsPayment');
const router = express.Router();
const {upload} = require('../multer/studentMulter');
const verifyToken = require('../middleware/verifyToken');
router.post('/signup', postinstituionssignup);
router.post('/login', postInstitutionslogin);
router.get('/getshowstudents', getInstitutionsStudents);
router.get('/getbalancestudents', getbalancestudents);
router.get('/getsearchresult', getSearchResult);
router.get('/getStudentMessage', verifyToken, getStudentMessage);
router.post('/addprofile', upload.single('image'), postAddProfile);
router.post('/postmessage', verifyToken, postInstitutionsMessage);
router.get('/getmessage', verifyToken, getmessageinstitutions);
router.post('/postsentedmessage', verifyToken, postSentedMessage);
router.post('/payment', postPaymentObject);
router.post('/addedimage', upload.single('image'), postAddedImage);


module.exports = router;
