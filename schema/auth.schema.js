const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                 ref: "Task"
            }
        ]            
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;