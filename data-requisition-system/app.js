require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// API Routes
app.use('/api/users', userRoutes);



// Test endpoint
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});











// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const port = 3000;
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Middleware to parse JSON requests
// app.use(express.json());


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to the Data Requisition System API');
// });


// // Set up MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Str0ng@Password123',
//   database: 'requisition_db'
// });

// // Check DB connection
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connection to the database successful');
// });

// // Test route to check server functionality
// app.get('/test', (req, res) => {
//   res.send('Test route is working');
// });

// // Import routes
// const routes = require('./routes/routes');
// app.use('/api', routes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
