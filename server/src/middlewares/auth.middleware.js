const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token.", error: error.message });
    }
};
module.exports = verifyToken;
