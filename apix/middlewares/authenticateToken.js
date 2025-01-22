// Адаптация authenticateToken.js для работы с локальными данными
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded.email;
        req.id_user = decoded.id;
        req.email = decoded.email;

        next();
    } catch (err) {
        return res.status(403).json({ message: "Failed to authenticate token" });
    }
};

module.exports = authenticateToken;
