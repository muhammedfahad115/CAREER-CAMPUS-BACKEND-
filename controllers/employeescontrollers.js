const employees = require('../models/employeesSchema');
const bcrypt = require('bcrypt');

const employeesObject = {
  postemployeessignup: async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    const existingEmployees = await employees.findOne({email: email});
    if (existingEmployees) {
      return res.status(400).json({error: 'You already have an account. Please login.'});
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(firstName, lastName, email, hashedPassword);
      const newEmployees = new employees({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      newEmployees.save();
      return res.json({message: 'Signup successfull'});
    }
  },
};

module.exports = employeesObject;
