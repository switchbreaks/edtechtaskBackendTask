const bcrypt = require("bcrypt");
const jwt = require("../../utils/jwt.js");
const User = require("../../schema/auth.schema.js");

const { successResponse, errorResponse } = require("../../helpers/response/allResponse.js");
const  successMessages  = require("../../helpers/messages/successMessages.js");
const errorMessages  = require("../../helpers/messages/errorMessages.js");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return errorResponse(res, errorMessages?.ERROR002, 400);
        }

        if (typeof name !== "string" || name.trim().length < 2) {
            return errorResponse(res, errorMessages?.ERROR003, 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse(res, errorMessages?.ERROR004, 400);
        }

        if (password.length < 6) {
            return errorResponse(res, errorMessages?.ERROR005, 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return errorResponse(res, errorMessages?.ERROR006, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await user.save();
        return successResponse(res, successMessages.SUCCESS001, 201);

    } catch (error) {
        console.log("Registration Error:", error);
        return errorResponse(
            res,
            errorMessages?.ERROR001 || "An error occurred during registration",
            500
        );
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return errorResponse(
                res,
                errorMessages?.ERROR009,
                400
            );
        }

        if (typeof email !== "string" || typeof password !== "string") {
            return errorResponse(
                res,
                errorMessages?.ERROR011,
                400
            );
        }

        email = email.trim().toLowerCase();
        password = password.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse(
                res,
                errorMessages?.ERROR004,
                400
            );
        }

        if (password.length < 6) {
            return errorResponse(
                res,
                errorMessages?.ERROR005,
                400
            );
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return errorResponse(
                res,
                errorMessages?.ERROR010,
                401
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return errorResponse(
                res,
                errorMessages?.ERROR008,
                401
            );
        }

        const token = jwt.generateToken({
            id: user._id.toString()
        });


        return successResponse(
            res,
            successMessages?.SUCCESS002,
            200,
            {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            }
        );

    } catch (error) {
        console.log("Login Error:", error);
        return errorResponse(
            res,
            errorMessages?.ERROR001,
            500
        );
    }
};