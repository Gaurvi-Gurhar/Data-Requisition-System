require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRegister = require('./routes/auth/userRegister');
const userLogin = require('./routes/auth/userLogin');
const viewUserRequests = require("./routes/user/viewExistingRequests");
const createNewRequest = require("./routes/user/createNewRequest");
const viewAllRequests = require("./routes/admin/viewAllRequests");
const updateRequests = require("./routes/user/updateRequest");
const cancelRequests = require("./routes/user/cancelRequest");
const getItems = require("./routes/user/getItems");
const insertItems = require("./routes/user/insertItem");
const allocateRequest = require("./routes/admin/allocateRequest");
const viewConsolidateRequest = require("./routes/admin/viewConsolidatedRequest");

const app = express();

// ----------- that is your middleware and you can add more for different things like file uploads etc...
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------- in this you have to add your routes that you have been created note that you have to make sure to check the endpoints...
app.use('/auth', userRegister);
app.use('/auth', userLogin);
app.use('/user', viewUserRequests);
app.use('/user', createNewRequest);
app.use('/user', updateRequests);
app.use('/user', cancelRequests);
app.use('/user', getItems);
app.use('/user', insertItems);
app.use('/admin', viewAllRequests);
app.use('/admin', allocateRequest);
app.use('/admin', viewConsolidateRequest);

// ----------- only for testing purpose...
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

module.exports = app;