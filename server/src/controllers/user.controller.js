const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { signupSchema, signinSchema } = require("../validators/user.validator");

const signup = async (req, res) => {
    try {
        const { username, email, mobile, password } = signupSchema.parse(req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
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

const signin = async (req, res) => {
    try {
        const { email, password } = signinSchema.parse(req.body);

        const existingUser = await User
            .findOne({ email })
            .select("+passwordHash");

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Signin successful" });

    } catch (error) {
        res.status(500).json({
            message: "Error signing in",
            error: error.message
        });
    }
};


const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
};


module.exports = {
    signup,
    signin,
    logout
};