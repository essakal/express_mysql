const express = require('express');
const app = express();
app.use(express.json())
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'skl'
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = 1';

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error executing query');
            return;
        }
        if (results[0].email === "superadmin@manar.ma") {
            bcrypt.compare("password", results[0].password, (error, result1) => {
                if (error) throw error;

                if (result1 === true) {
                    res.send('Logged in successfully');
                    //here get token 
                    // token = jwt.sign(payload, secret, { expiresIn: "1y" })
                    // res.json({ "token": token, user: user })
                } else {
                    res.status(401).send('Invalid email or password');
                }
            })
        }
        else {
            res.status(401).send('Invalid email or password1');
        }
        // res.send(results[0]);
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
