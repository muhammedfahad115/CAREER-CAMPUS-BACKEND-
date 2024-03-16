const Institutions = require('../models/institutionsSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentProfile = require('../models/StudentsProfileSchema');
const secretKey = process.env.JWT_SECRET;
const InstitutionsProfile = require('../models/InstitutionsProfile');
const emailController = require('../controllers/EmailControllers');
const Message = require('../models/messageSchema');
const message = require('../models/messageSchema');
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
      const mergedName = firstName + ' ' + lastName;
      emailController.sendWelcomeEmail(mergedName, email);
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
  getSearchResult: async (req, res)=>{
    try {
      const query = req.query.q.toLowerCase();
      console.log(query);

      const searchResults = await StudentProfile.aggregate([
        {
          $match: {
            $expr: {
              $or: [
                {
                  $regexMatch: {
                    input: {$concat: ['$firstName', ' ', '$lastName']},
                    regex: new RegExp(query, 'i'),
                  },
                },
                {
                  $regexMatch: {
                    input: '$firstName',
                    regex: new RegExp(query, 'i'),
                  },
                },
                {
                  $regexMatch: {
                    input: '$lastName',
                    regex: new RegExp(query, 'i'),
                  },
                },
              ],
            },
          },
        },
      ]);

      console.log(searchResults);
      res.status(200)
          .json({message: 'Got the searched students', searchResults});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  },
  postAddProfile: async (req, res) =>{
    try {
      const {firstName, lastName, dob, institution,
        description, contactNumber, email} = req.body;
      console.log(firstName, lastName, dob, institution, description,
          contactNumber, email);
      const image = req.file.location;
      console.log(image);
      const existingProfile = await InstitutionsProfile.findOne(
          {contactNumber: contactNumber});
      if (existingProfile) {
        res.status(400).json({error:
          'You have already added your Profile details'});
      } else {
        const newProfile = new InstitutionsProfile({
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          institution: institution,
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
  getStudentMessage: async (req, res)=>{
    const findStudent = await StudentProfile.find({});
    const recieverEmail = req.students.email;
    res.status(200)
        .json({message: 'student is now displayed on chat list',
          findStudent, recieverEmail});
  },
  postInstitutionsMessage: async (req, res)=>{
    const postMessage = req.body;
    const {message, senderEmail, recieverEmail} = postMessage;
    console.log(message, senderEmail, recieverEmail);
    // console.log('console from the institutions', req.body);
    try {
      if (message && senderEmail && recieverEmail) {
        const saveMessageObject = new Message({
          message: message,
          senderEmail: senderEmail,
          recieverEmail: recieverEmail,
        });
        await saveMessageObject.save();
        res.status(200).json({message: 'RecievedMessage saved'});
      }
    } catch (error) {
      console.log(error);
    }
  },
  getmessageinstitutions: async (req, res)=>{
    const recieverEmail = req.query.senderEmail;
    const senderEmail = req.students.email;
    console.log(senderEmail, recieverEmail);
    try {
      const findMessage = await Message
          .find({senderEmail: recieverEmail, recieverEmail: senderEmail});
      const findSenderMessage = await Message
          .find({senderEmail: senderEmail, recieverEmail: recieverEmail});
      console.log(findSenderMessage);
      if (findMessage) {
        res.status(200)
            .json({message: 'Message fetched succesfully', findMessage});
      } else {
        res.status(400).json({error: 'Cannot find messages'});
      }
      console.log('insitutions findedMessage', findMessage);
    } catch (error) {
      console.log('Error during finding the messages', error);
    }
  },
  postSentedMessage: async (req, res) =>{
    const {message, senderEmail} = req.body;
    const recieverEmail = req.students.email;
    console.log('sented message from the institutions:',
        message, senderEmail, recieverEmail);
    if (message && senderEmail && recieverEmail) {
      const saveSentedMessage = new Message({
        message: message,
        senderEmail: senderEmail,
        recieverEmail: recieverEmail,
      });
      await saveSentedMessage.save();
      res.status(200).json({message: 'Sented Message Successfully '});
      console.log('message saved successfully', saveSentedMessage);
    }
    console.log();
  },
};

module.exports = institutionsObject;
