// // const express = require('express');
// // const { adminLogin, policyholderLogin } = require('../controllers/authController');
// // const router = express.Router();

// // router.post('/admin/login', adminLogin);
// // router.post('/policyholder/login', policyholderLogin);

// // module.exports = router;

// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const BlacklistedToken = require('../models/blacklistedToken');
// const { adminLogin, policyholderLogin } = require('../controllers/authController');

// // Login routes
// router.post('/admin/login', adminLogin);
// router.post('/policyholder/login', policyholderLogin);

// // Logout route
// router.post('/logout', async (req, res) => {
//   try {
//     const token = req.header('Authorization');
//     if (!token) return res.status(400).json({ message: 'Token not provided' });

//     // Decode token to get expiration time
//     const decoded = jwt.decode(token);
//     const expiresAt = new Date(decoded.exp * 1000);

//     // Add token to blacklist
//     await BlacklistedToken.create({ token, expiresAt });
//     res.json({ message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router; 

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const BlacklistedToken = require("../models/blacklistedToken");
const { adminLogin, policyholderLogin } = require("../controllers/authController");

// Login routes
router.post("/admin/login", adminLogin);
router.post("/policyholder/login", policyholderLogin);

// Logout route
router.post("/logout", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Token not provided" });
        }

        const token = authHeader.split(" ")[1];

        // Decode token
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const expiresAt = new Date(decoded.exp * 1000); // Convert expiration time to Date object

        // Add the token to the blacklist
        await BlacklistedToken.create({ token, expiresAt });

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
 