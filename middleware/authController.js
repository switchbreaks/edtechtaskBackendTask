const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const { errorResponse } = require("../helpers/response/allResponse.js");
const errorMessages = require("../helpers/messages/errorMessages.js");

const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return errorResponse(
                res,
                errorMessages.ERROR014,
                401
            );
        }

        if (!authHeader.startsWith("Bearer ")) {
            return errorResponse(
                res,
                errorMessages.ERROR012,
                401
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log("Auth Error:", error);

        return errorResponse(
            res,
            errorMessages.ERROR014,
            401
        );
    }
};

module.exports = { authMiddleware };