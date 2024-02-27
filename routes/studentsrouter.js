const express = require('express');
const {postStudentsignup, postStudentlogin, postOtp,
  postVerifyOtp,
  postNewPassword,
  postAddProfile, getStudents,
  editStudent} = require('../controllers/studentscontrollers');
// eslint-disable-next-line new-cap
const router = express.Router();
const {upload} = require('../multer/studentMulter');
const verifyToken = require('../middleware/verifyToken');
router.post('/signup', postStudentsignup);
router.post('/login', postStudentlogin);
router.post('/otp', postOtp);
router.post('/verifyotp', postVerifyOtp);
router.patch('/newpassword', postNewPassword);
router.post('/addprofile', upload.single('image'), postAddProfile);
router.get('/getStudents', verifyToken, getStudents);
router.put('/editstudents', verifyToken, editStudent);
// router.post('/get-user-profile', verifyToken , getProfile)

module.exports = router;

