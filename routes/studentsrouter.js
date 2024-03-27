const express = require('express');
const {postStudentsignup, postStudentlogin, postOtp,
  postVerifyOtp,
  postNewPassword,
  postAddProfile, getStudents,
  editStudent,
  getInstitutions,
  getStudentsInstitutions,
  getBalanceInstitutions,
  getInstitutionsMessage,
  postStudentsMessage,
  getmessagestudents,
  postStudentSentedMessage,
  postRating,
  postLike,
  postComment} = require('../controllers/studentscontrollers');
// eslint-disable-next-line new-cap
const router = express.Router();
const {upload} = require('../multer/studentMulter');
const verifyToken = require('../middleware/verifyToken');
router.post('/signup', postStudentsignup);
router.post('/login', postStudentlogin);
router.post('/otp', postOtp);
router.post('/verifyotp', postVerifyOtp);
router.patch('/newpassword', postNewPassword);
router.get('/getshowinstitutions', getStudentsInstitutions);
router.get('/getbalanceinstitutions', getBalanceInstitutions);
router.post('/addprofile', upload.single('image'), postAddProfile);
router.get('/getStudents', verifyToken, getStudents);
router.get('/getinstitutions', verifyToken, getInstitutionsMessage);
router.put('/editstudents', verifyToken, editStudent);
router.get('/getinstitutions', verifyToken, getInstitutions);
router.post('/postmessage', verifyToken, postStudentsMessage);
router.get('/getmessage', verifyToken, getmessagestudents);
router.post('/postsentedmessage', verifyToken, postStudentSentedMessage);
router.post('/rating', verifyToken, postRating);
router.post('/comments',verifyToken, postComment);
// router.get('/getrating', getRating);
// router.post('/get-user-profile', verifyToken , getProfile)

module.exports = router;

