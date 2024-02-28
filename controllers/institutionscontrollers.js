const Institutions = require('../models/institutionsSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentsProfile = require('../models/StudentsProfileSchema');
const StudentProfile = require('../models/StudentsProfileSchema');
const secretKey = process.env.JWT_SECRET;
const institutionsObject = {
  postinstituionssignup: async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    const existingInstituions = await Institutions.findOne({email: email});
    if (existingInstituions) {
      return res.status(400).json(
          {error: 'You already have an account. Please login.'});
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(firstName, lastName, email, hashedPassword);
      const newInstitutions = new Institutions({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      newInstitutions.save();
      return res.json({message: 'Signup successfull'});
    }
  },
  postInstitutionslogin: async (req, res) => {
    const {email, password} = req.body;
    try {
      const institutions = await Institutions.findOne({email});
      if (!institutions) {
        return res.status(401).json({error: ' User not found'});
      }
      const passwordMatch = await bcrypt.compare(password,
          institutions.password);
      if (!passwordMatch) {
        return res.status(401).json({error: 'Password is Incorrect'});
      }
      if (institutions && password) {
        const token = jwt.sign(
            {email: institutions.email},
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
  getInstitutionsStudents: async (req, res)=>{
    const {currentPage, limit} = req.query;
    const skipCount = (currentPage - 1)*limit;
    const findStudents = await
    StudentProfile.find()
        .skip(skipCount)
        .limit(parseInt(limit, 10));
    // console.log(findStudents);
    res .status(200)
        .json({message: 'Students data fetched successfully', findStudents});
  },
  getbalancestudents: async (req, res)=>{
    // const {currentPage, limit} = req.query;
    const findBalance = await StudentProfile.find({});
    const findBalanceLength = findBalance.length;
    res .status(200)
        .json({message: 'Got the balance data to show', findBalanceLength});
  },
};

module.exports = institutionsObject;
