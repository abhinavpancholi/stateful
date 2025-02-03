const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const Policyholder = require('../models/policyholder');

const generateToken = (user, role) => {
    return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Admin Login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin || admin.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(admin, 'admin');
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Policyholder Login
exports.policyholderLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Policyholder.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user, 'policyholder');
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};