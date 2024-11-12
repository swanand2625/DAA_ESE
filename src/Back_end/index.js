const express = require('express');
const db = require('./config.js'); 
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const app = express();

app.use(cors());
app.use(express.json());


const JWT_SECRET = 'Swanand';


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};


app.post('/register', async (req, res) => {
    const { name, email, password, mobno } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, mobno], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).send('Error registering user');
            return;
        }
        res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Error logging in');
            return;
        }
        if (results.length > 0) {
            const user = results[0];

            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }

            
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).send({ token, userId: user.id });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    });
});


app.get('/profile/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;

    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error retrieving user data:', err);
            res.status(500).send('Error retrieving profile');
            return;
        }
        if (results.length > 0) {
            res.status(200).send(results[0]);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    });
});


app.put('/profile/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;
    const { name, email, password, mobno } = req.body;

    
    const values = [name, email, mobno, userId]; 

   
    let sql = 'UPDATE users SET name = ?, email = ?, phone_number = ? WHERE id = ?';

   
    if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Error updating profile');
            }

           
            sql = 'UPDATE users SET name = ?, email = ?, password = ?, phone_number = ? WHERE id = ?';
            values.splice(2, 0, hashedPassword); 
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error updating profile:', err);
                    return res.status(500).send('Error updating profile');
                }
                res.status(200).send({ message: 'Profile updated successfully' });
            });
        });
    } else {
        
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating profile:', err);
                return res.status(500).send('Error updating profile');
            }
            res.status(200).send({ message: 'Profile updated successfully' });
        });
    }
});



app.post('/search', authenticateToken, (req, res) => {
    const { query } = req.body;

   
    const sql = 'SELECT * FROM users WHERE name LIKE ? OR email LIKE ?';
    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) {
            console.error('Error searching in the database:', err);
            return res.status(500).send('Error searching for contacts');
        }
        res.status(200).send(results);
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});