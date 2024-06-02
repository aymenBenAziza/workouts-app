const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// Function to create a JWT token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// Controller function to handle user login
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    try {
        // Attempt to log in the user
        const user = await User.login(email, password);

        // If login is successful, create a JWT token
        const token = createToken(user._id);

        // Respond with the user and token
        res.status(200).json({ user, token });
    } catch (err) {
        // If login fails, respond with an error
        res.status(400).json({ error: err.message });
    }
}

// Controller function to handle user signup
const signupUser = async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    try {
        // Attempt to sign up the user
        const user = await User.signup(email, password);

        // If signup is successful, create a JWT token
        const token = createToken(user._id);

        // Respond with the user and token
        res.status(200).json({ user, token });
    } catch (err) {
        // If signup fails, respond with an error
        res.status(400).json({ error: err.message });
    }
}

// Export the controller functions
module.exports = {
    loginUser,
    signupUser
}
