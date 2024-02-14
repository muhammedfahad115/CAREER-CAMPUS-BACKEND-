const companies = require('../models/companiesSchema')
const bcrypt = require('bcrypt')

let companiesObject = {
    postcompaniessignup: async (req, res) => {
        const { firstName, lastName, email, password } = req.body
        let existingCompanies = await companies.findOne({ email: email })
        if (existingCompanies) {
            return res.status(400).json({ error: 'You already have an account. Please login.' })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(firstName, lastName, email, hashedPassword)
            const newCompanies = new companies({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            })
            newCompanies.save()
            return res.json({ message: 'Signup successfull' })
        }
    }
}

module.exports = companiesObject