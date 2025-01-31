const policies = require('../models/policy');
const policyholders = require('../models/policyholder');

exports.createPolicy = (req, res) => {
    const { id, policyholderId, policyType, coverageAmount } = req.body;

    if (policies[id]) return res.status(400).json({ message: "Policy ID already exists" });
    if (!policyholders[policyholderId]) return res.status(400).json({ message: "Invalid policyholder ID" });

    const validPolicyTypes = ["Health", "Auto", "Home"];
    if (!validPolicyTypes.includes(policyType)) return res.status(400).json({ message: "Invalid policy type" });
    if (coverageAmount <= 0) return res.status(400).json({ message: "Coverage amount must be greater than zero" });

    policies[id] = { id, policyholderId, policyType, coverageAmount };
    res.status(201).json({ message: "Policy created successfully", data: policies[id] });
};

exports.updatePolicy = (req, res) => {
    const { id } = req.params;
    const { policyType, coverageAmount } = req.body;

    if (!policies[id]) return res.status(404).json({ message: "Policy not found" });

    const validPolicyTypes = ["Health", "Auto", "Home"];
    if (policyType && !validPolicyTypes.includes(policyType)) return res.status(400).json({ message: "Invalid policy type" });
    if (coverageAmount && coverageAmount <= 0) return res.status(400).json({ message: "Coverage amount must be greater than zero" });

    policies[id] = { ...policies[id], policyType: policyType || policies[id].policyType, coverageAmount: coverageAmount || policies[id].coverageAmount };
    res.json({ message: "Policy updated successfully", data: policies[id] });
};


exports.getAllPolicies = (req, res) => res.json(Object.values(policies));
