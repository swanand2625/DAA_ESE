const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        
    password: '5526', 
    database: 'pl3'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;
