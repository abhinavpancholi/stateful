const express = require('express');
const router = express.Router();
const { createPolicy, getAllPolicies, getPolicyById, updatePolicy, deletePolicy } = require('../controllers/policyController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

// Policyholder can create policies
router.post('/', authenticateUser, createPolicy);

// Admin can get all policies
router.get('/', authenticateAdmin, getAllPolicies);

// Policyholder or admin can get a policy by ID
router.get('/:id', authenticateUser, getPolicyById);

// Admin can update a policy
router.put('/:id', authenticateAdmin, updatePolicy);

// Admin can delete a policy
router.delete('/:id', authenticateAdmin, deletePolicy);

module.exports = router;