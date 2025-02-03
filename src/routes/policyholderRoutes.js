const express = require('express');
const router = express.Router();
const { createPolicyholder, getAllPolicyholders, updatePolicyholder, deletePolicyholder } = require('../controllers/policyholderController');

router.post('/', createPolicyholder);
router.get('/', getAllPolicyholders);
router.put('/:id', updatePolicyholder);
router.delete('/:id', deletePolicyholder);

module.exports = router;