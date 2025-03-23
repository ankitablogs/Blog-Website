const User = require('../Model/userModal');
const jwt = require('jsonwebtoken');
const getProfileData = async (req, res) => {
    try {
        const user = await User.findById(process.env.ADMIN_ID);
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateProfileData = async (req, res) => {
    res.json(`Hello World ${req?.cookies?.token}`);
    return;
    
    try {
        const token = req.cookies.token;
    console.log(req.cookies);
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const {id} = jwt.verify(token, process.env.SECRET_CODE);
    if(id !== process.env.ADMIN_ID) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }

        const user = await User.findByIdAndUpdate(process.env.ADMIN_ID, req.body);
        await user.save();
        res.json('Profile updated successfully');
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const loginUser = async (req, res) => {
    const jwt = require('jsonwebtoken');

try {
    if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ id: process.env.ADMIN_ID }, process.env.SECRET_CODE, { expiresIn: '24h' });

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true, // Make the cookie accessible via JavaScript
            secure: true,   // Set to true if using HTTPS
            sameSite: 'none', // Allow cross-site requests (for testing)
            maxAge: 1000 * 60 * 60 * 24,
          });

        res.json({
            message: 'Login successful!',
            token: token
        });
    } else {
        res.status(400).json({
            message: 'Invalid Credentials'
        });
    }
} catch (error) {
    res.status(500).json({
        message: error.message
    });
}

}


const logoutUser = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true, // Make the cookie accessible via JavaScript
        secure: true,   // Set to true if using HTTPS
        sameSite: 'none', // Allow cross-site requests (for testing)
        maxAge: 0,
      });
    res.json({
        message: 'Logout successful!'
    });
}

module.exports = { getProfileData, updateProfileData, loginUser, logoutUser };