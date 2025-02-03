const express = require('express');
const router = express.Router();
const { createPolicyholder, getAllPolicyholders, updatePolicyholder, deletePolicyholder } = require('../controllers/policyholderController');

if (!createPolicyholder || !getAllPolicyholders || !updatePolicyholder) {
    console.error("Error: One or more controller functions are undefined.");
}

router.post('/', createPolicyholder);
router.get('/', getAllPolicyholders);
router.put('/:id', updatePolicyholder);
router.delete('/:id', deletePolicyholder);

module.exports = router;
