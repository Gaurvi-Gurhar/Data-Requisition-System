require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRegister = require('./routes/auth/userRegister');
const userLogin = require('./routes/auth/userLogin');

const app = express();

// ----------- that is your middleware and you can add more for different things like file uploads etc...
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- in this you have to add your routes that you have been created note that you have to make sure to check the endpoints...
app.use('/auth', userRegister);
app.use('/auth', userLogin);

// ----------- only for testing purpose...
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

module.exports = app;