const express = require('express');
const router = express.Router();
const { createClaim, updateClaim, getAllClaims, deleteClaim } = require('../controllers/claimController');

router.post('/', createClaim);
router.get('/', getAllClaims);
router.put('/:id', updateClaim);
router.delete('/:id', deleteClaim);


module.exports = router;
