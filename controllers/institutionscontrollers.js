const Institutions = require('../models/institutionsSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentsProfile = require('../models/StudentsProfileSchema');
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
    const getStudents = await StudentsProfile.find({});
    if (getStudents) {
      res.status(200).json({
        message: 'Students data fetched successfully', getStudents});
    } else {
      res.status(404).json({error: 'Data  is not there '});
    }
  },
};

module.exports = institutionsObject;
