const { z } = require("zod");

const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    mobile: z.string().min(10).max(15),
    password: z.string().min(6)
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

module.exports = { 
    signupSchema,
    signinSchema
};