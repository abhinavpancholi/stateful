// const express = require('express');
// const router = express.Router();
// const { createPolicy, getAllPolicies, getPolicyById, updatePolicy, deletePolicy, getPoliciesByUserEmail } = require('../controllers/policyController');
// const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

// // Policyholder can create policies
// router.post('/', authenticateUser, createPolicy);



// router.get('/', getAllPolicies);

// // Policyholder or admin can get a policy by ID
// router.get('/:id', authenticateUser, getPolicyById);

// // Admin can update a policy
// router.put('/:id', authenticateAdmin, updatePolicy);

// // Admin can delete a policy
// router.delete('/:id', authenticateAdmin, deletePolicy);

// module.exports = router;

// policyRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
  getPoliciesByLoggedInUser, // Add this new function
} = require("../controllers/policyController");

// Policyholder can create policies
router.post("/", authenticateUser, createPolicy);

// Fetch policies for the logged-in policyholder
router.get("/my-policies", authenticateUser, getPoliciesByLoggedInUser);

// Admin can get all policies
router.get("/", getAllPolicies);

// Policyholder or admin can get a policy by ID
router.get("/:id", authenticateUser, getPolicyById);

// Admin can update a policy
router.put("/:id", authenticateUser, updatePolicy);

// Admin can delete a policy
router.delete("/:id", authenticateUser, deletePolicy);

module.exports = router;