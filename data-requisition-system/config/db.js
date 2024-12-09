const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;






// const mysql = require('mysql2');
// require('dotenv').config();

// const db = mysql.createConnection({
//   // host: 'localhost',
//   // user: 'root',
//   // password: 'Str0ng@Password123',
//   // database: 'requisition_db'
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the database');
// });

// // db.query('SELECT 10 + 1 AS solution', (err, results) => {
// //   if (err) {
// //       console.log('Error in test query:', err);
// //   } else {
// //       console.log('Test query result:', results);
// //   }
// // });

// module.exports = db;
