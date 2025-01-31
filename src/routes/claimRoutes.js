const express = require('express');
const router = express.Router();
const { createClaim, updateClaimStatus, getAllClaims } = require('../controllers/claimController');

router.post('/', createClaim);
router.put('/:id', updateClaimStatus);
router.get('/', getAllClaims);

module.exports = router;
