const Students = require('../models/studentsSchema');
const StudentProfile = require('../models/StudentsProfileSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const getOtp = require('./utilities/twilio');
const twilioVerify = require('./utilities/twilioverify');
const secretKey = process.env.JWT_SECRET;

const studentsObject = {
  postStudentsignup: async (req, res) => {
    const {firstName, lastName, email, phoneNumber, password} = req.body;
    // h
    const existingStudents = await Students.findOne({email: email});
    if (existingStudents) {
      // e
      return res.status(400).json(
          {error: 'You already have an account. Please login.'});
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStudent = new Students({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      });
      newStudent.save();
      return res.json({message: 'Signup successfull'});
    }
  },
  postStudentlogin: async (req, res) => {
    const {email, password} = req.body;
    try {
      const student = await Students.findOne({email});
      if (!student) {
        return res.status(401).json({error: ' User not found'});
      }
      const passwordMatch = await bcrypt.compare(password, student.password);
      if (!passwordMatch) {
        return res.status(401).json({error: 'Password is Incorrect'});
      }
      if (student && password) {
        const token = jwt.sign(
            {email: student.email},
            secretKey, {expiresIn: '1d'},
        );
        res.cookie('jwtToken', token, {httpOnly: true, maxAge: 60});
        return res.status(200).json(
            {success: true, message: 'Login successful', token});
      }
    } catch (error) {
      console.log('error has occured:', error);
      res.status(500).json({error: 'Internal server error'});
    }
  },
  postOtp: async (req, res) => {
    try {
      const {emailOrPhoneNumber} = req.body;
      let phoneNumber;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrPhoneNumber)) {
        // kjh
        const existingStudents = await Students.findOne(
            {email: emailOrPhoneNumber});
        // jkj
        if (!existingStudents) {
          return res.status(401).json({error: 'User not found'});
        } else {
          phoneNumber = existingStudents.phoneNumber;
          getOtp(phoneNumber);
          return res.status(200).json({message: 'success', phoneNumber} );
        }
      }

      if (/^\d{10}$/.test(emailOrPhoneNumber)) {
        const existingStudents = await Students.findOne(
            {phoneNumber: emailOrPhoneNumber});
        if (!existingStudents) {
          return res.status(401).json({error: 'User not found'});
        } else {
          phoneNumber = existingStudents.phoneNumber;
          getOtp(phoneNumber);
          return res.status(200).json({message: 'success', phoneNumber} );
        }
      }
    } catch (error) {
      console.error('Error in postOtp:', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  },
  postVerifyOtp: async (req, res) => {
    try {
      const {Otp, verifyPhoneNumber} = req.body;
      const verifResponse = await twilioVerify(verifyPhoneNumber, Otp);
      if (verifResponse.status !== 'approved') {
        res.status(400).json({error: 'Incorrect Otp'});
      } else {
        res.status(200).json({message: 'Otp successfully verified'});
      }
      console.log(Otp, verifyPhoneNumber);
    } catch (error) {
      console.log('An error occured', error);
    }
  },
  postNewPassword: async (req, res) => {
    try {
      const {newpassword, verifyPhoneNumber} = req.body;
      const newHashedPassword = await bcrypt.hash(newpassword, 10);
      console.log(newHashedPassword);
      const findStudentAndUpdate = await Students.findOneAndUpdate(
          {phoneNumber: verifyPhoneNumber},
          {$set: {password: newHashedPassword}},
          {new: true},
      );
      if (!findStudentAndUpdate) {
        return res.status(500).json({error: 'Error during Upating password'});
      }
      return res.status(200).json({message: 'Password Updated successfully'});
    } catch (error) {
      console.error('error in postNewpassword');
      res.status(500).json({error: 'Internal server error'});
    }
  },
  postAddProfile: async (req, res) =>{
    try {
      const {firstName, lastName, dob, gender,
        description, contactNumber, email} = req.body;
      console.log(firstName, lastName, dob, gender, description,
          contactNumber, email);
      const image = req.file.location;
      console.log(image);
      const existingProfile = await StudentProfile.findOne( 
          {contactNumber: contactNumber});
      if (existingProfile) {
        res.status(400).json({error:
          'You have already added your Profile details'});
      } else {
        const newProfile = new StudentProfile({
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          gender: gender,
          description: description,
          contactNumber: contactNumber,
          email: email,
          image: image,
        });
        await newProfile.save();
        res.status(200).json({message: 'Profile added successfully'});
      }
    } catch (error) {
      console.log('error occured when saving the profile details', error);
    }
  },
  getStudents: async (req, res)=>{
    const email = req.students.email;
    try {
      const findStudents = await StudentProfile.findOne({email: email});
      if (findStudents) {
        return res.status(200).json({findStudents});
      }
      console.log(email);
    } catch (error) {
      console.error('An error occured:', error);
    }
  },
  editStudent: async (req, res)=>{
    try {
      const studentEmail = req.students.email;
      const {firstName, lastName, dob, gender,
        description, contactNumber, email} = req.body.formData;
      const findAndEdit = await StudentProfile.findOneAndUpdate(
          {email: studentEmail}, {
            $set: {
              firstName: firstName,
              lastName: lastName,
              dob: dob,
              gender: gender,
              description: description,
              contactNumber: contactNumber,
              email: email,
            },
          },
          {new: true},
      );
      if (findAndEdit) {
        res.status(200).json({message: 'Profile updated successfully'});
        console.log('profile updated successfully');
      } else {
        console.log('profile not found');
      }
    } catch (error) {
      console.error('An error occured when updating profile details', error);
    }
  },
};

module.exports = studentsObject;
