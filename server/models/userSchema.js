const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        sname: {
            type: String,
            required: [true, 'Please provide a student name'],
            trim: true,
        },
        course: {
            type: String,
            required: [true, 'Please provide a course name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email address'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: (value) => /\S+@\S+\.\S+/.test(value),
                message: 'Please provide a valid email address',
            },
        },
        phoneNo: {
            type: Number,
            required: [true, 'Please provide a phone number'],
            validate: {
                validator: (value) => /^\d{10}$/.test(value),
                message: 'Please provide a valid 10-digit phone number',
            },
        },
        CGPA: {
            type: Number,
            required: [true, 'Please provide a CGPA'],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const users = mongoose.model("users", userSchema);

module.exports = users;
