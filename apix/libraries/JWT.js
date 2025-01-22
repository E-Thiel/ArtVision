// Адаптация JWT.js для локальной работы
const jwt = require('jsonwebtoken');

class JwtService {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'defaultSecret';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    }

    generateToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch (err) {
            throw new Error('Token verification failed');
        }
    }
}

module.exports = new JwtService();
