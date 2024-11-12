// app.js
const express = require('express');
const app = express();
app.use(express.json());

const users = []; 

app.post('/register', (req, res) => {
    const { documentNumber, fullName, phoneNumber, email } = req.body;

    const userExists = users.some(user => user.documentNumber === documentNumber);
    if (userExists) {
        return res.status(400).json({ error: "Usuario ya registrado" });
    }

    const newUser = { documentNumber, fullName, phoneNumber, email };
    users.push(newUser);
    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
});

module.exports = { app, users };
