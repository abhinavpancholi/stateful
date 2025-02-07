const jwt = require('jsonwebtoken');

// middleware/authMiddleware.js
// const jwt = require('jsonwebtoken'); 
const BlacklistedToken = require('../models/blacklistedToken');

// const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     // Check if token is blacklisted
//     const isBlacklisted = await BlacklistedToken.findOne({ token });
//     if (isBlacklisted) {
//       return res.status(401).json({ message: 'Token invalidated' });
//     }

//     // Verify token
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// }; 

// Rest of the middleware remains the same...

// // const authenticateUser = (req, res, next) => {
// //     const token = req.header('Authorization');
// //     if (!token) return res.status(401).json({ message: 'Access Denied' });

// //     try {
// //         const verified = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = verified;
// //         next();
// //     } catch (err) {
// //         res.status(400).json({ message: 'Invalid Token' });
// //     }
// // };

// const authenticateUser = (req, res, next) => {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     console.log("Extracted Token:", token); // ✅ Debug token extraction

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         console.log("Decoded User:", decoded); // ✅ Debug decoded user
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: "Invalid token" });
//     }
// };

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // ✅ Debug token extraction

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await BlacklistedToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token invalidated. Please log in again." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Decoded User:", decoded); // ✅ Debug decoded user
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};        

const authenticateAdmin = (req, res, next) => {
    authenticateUser(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    });
};

module.exports = { authenticateUser, authenticateAdmin };