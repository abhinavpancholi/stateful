const claims = require('../models/claim');
const policies = require('../models/policy');

exports.createClaim = (req, res) => {
    const { id, policyId, claimAmount } = req.body;

    if (claims[id]) return res.status(400).json({ message: "Claim ID already exists" });
    if (!policies[policyId]) return res.status(400).json({ message: "Invalid policy ID" });
    if (claimAmount > policies[policyId].coverageAmount) return res.status(400).json({ message: "Claim amount exceeds policy coverage" });

    claims[id] = { id, policyId, claimAmount, status: "Pending" };
    res.status(201).json({ message: "Claim created successfully", data: claims[id] });
};

exports.updateClaimStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!claims[id]) return res.status(400).json({ message: "Claim not found" });
    if (!["Pending", "Approved", "Rejected"].includes(status)) return res.status(400).json({ message: "Invalid status update" });

    claims[id].status = status;
    res.json({ message: "Claim status updated successfully", data: claims[id] });
};

exports.getAllClaims = (req, res) => res.json(Object.values(claims));
