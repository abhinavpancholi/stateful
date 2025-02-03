const express = require('express');
const { createClaim, updateClaim, getAllClaims, getClaimById, deleteClaim } = require('../controllers/claimController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Policyholder can create claims
router.post('/', authenticateUser, createClaim);

// Admin can update claims
router.put('/:id', authenticateAdmin, updateClaim);

// Admin can get all claims
router.get('/', authenticateAdmin, getAllClaims);

// Admin can get a single claim by ID
router.get('/:id',  authenticateUser , getClaimById);

// Admin can delete a claim
router.delete('/:id', authenticateAdmin, deleteClaim);

module.exports = router;