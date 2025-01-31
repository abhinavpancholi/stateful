const express = require('express');
const router = express.Router();
const { createPolicyholder, getAllPolicyholders, updatePolicyholder} = require('../controllers/policyholderController');

router.post('/', createPolicyholder);
router.get('/', getAllPolicyholders);
router.put('/:id', updatePolicyholder);


module.exports = router;
