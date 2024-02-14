const express = require('express');
require('dotenv').config()
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = 5000;
const studentsrouter = require('./routes/studentsrouter')
const institutionsrouter = require('./routes/institutionsrouter')
const employeesrouter = require('./routes/employeesrouter')
const companiesrouter = require('./routes/companiesrouter')


require('./configure/configure')()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

app.use('/students', studentsrouter)
app.use('/institutions', institutionsrouter)
app.use('/employees', employeesrouter)
app.use('/companies', companiesrouter)


app.listen(port, () => {
    console.log('Server is running')
})

