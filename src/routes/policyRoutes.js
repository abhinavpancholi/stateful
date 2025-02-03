const express = require('express');
const router = express.Router();
const { createPolicy, getAllPolicies, updatePolicy, deletePolicy } = require('../controllers/policyController');

router.post('/', createPolicy);
router.get('/', getAllPolicies);
router.put('/:id', updatePolicy);
router.delete('/:id', deletePolicy);


module.exports = router;
