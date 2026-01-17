const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { signupSchema } = require("../validators/user.validator");

const signup = async (req, res) => {
    try {
        const { username, email, mobile, password } = signupSchema.parse(req.body);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            mobile,
            passwordHash
        });

        res.status(201).json({
            message: "User created successfully",
            userId: newUser._id
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
};

module.exports = { signup };