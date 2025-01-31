const express = require('express');
const router = express.Router();
const { createPolicy, getAllPolicies, updatePolicy } = require('../controllers/policyController');

router.post('/', createPolicy);
router.get('/', getAllPolicies);
router.put('/:id', updatePolicy);


module.exports = router;
