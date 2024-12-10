// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const db = require('./db');

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Routes
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
// const adminRoutes = require('./routes/admin');

// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
// app.use('/admin', adminRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


require('dotenv').config();
const app = require('./app'); // Import your main app file
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
