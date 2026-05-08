const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const DEFAULT_EXPIRES_IN = "12h";
const ALGORITHM = "HS256";

exports.generateToken = (payload, options = {}) => {
    if (!payload || typeof payload !== "object") {
        throw new Error("Payload must be a valid object");
    }

    return jwt.sign(payload, secretKey, {
        expiresIn: options.expiresIn || DEFAULT_EXPIRES_IN,
        algorithm: options.algorithm || ALGORITHM,
    });
};

exports.verifyToken = (token) => {
    if (!token) {
        throw new Error("Token is required");
    }

    return jwt.verify(token, secretKey);
};