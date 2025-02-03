const express = require('express');
const { adminLogin, policyholderLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/policyholder/login', policyholderLogin);

module.exports = router;