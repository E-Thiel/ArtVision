// Пример адаптации auth.js для работы с локальными данными
const express = require('express');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Локальные данные
const users = [
    { id: 1, user_name: 'artist1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Street', artist: true },
    { id: 2, user_name: 'artist2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', address: '456 Avenue', artist: false },
    { id: 3, user_name: 'artist3', name: 'Mike Brown', email: 'mike@example.com', phone: '1122334455', address: '789 Boulevard', artist: true },
];

const checkEmail = (req, res, next) => {
    if (!req.body.email) {
        return res.status(401).json({ message: `An error occurred! NO EMAIL` });
    } else {
        if (!validator.isEmail(req.body.email)) {
            return res.status(401).json({ message: `Your email address is not valid.` });
        } else {
            next();
        }
    }
};

const checkPassword = (req, res, next) => {
    if (!req.body.password) {
        return res.status(401).json({ message: "You must enter a password!" });
    } else {
        next();
    }
};

router.post("/register", checkEmail, checkPassword, async (req, res) => {
    console.log('/register call');
    const { user_name, name, email, phone, password, address, artist } = req.body;

    if (!name || !user_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = users.find((user) => user.email === email || user.user_name === user_name);
    if (userExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        user_name,
        name,
        email,
        phone,
        password: hashedPassword,
        address,
        artist: artist || 0,
    };

    users.push(newUser);

    res.status(201).json({
        message: `The user ${user_name} has been created!`,
    });
});

router.post("/login", async (req, res) => {
    console.log('/login call');
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = users.find((u) => u.user_name === userName);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
        { id: user.id, userName: user.user_name, email: user.email },
        process.env.JWT_SECRET,
        { algorithm: "HS512", expiresIn: "1h" }
    );

    res.status(200).json({
        message: "Login successful",
        token,
    });
});

module.exports = router;
