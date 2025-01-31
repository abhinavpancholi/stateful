const Claim = require('../models/claim');
const Policy = require('../models/policy');

exports.createClaim = async (req, res) => {
    try {
        const { policyId, claimAmount } = req.body;

        const policy = await Policy.findById(policyId);
        if (!policy) return res.status(400).json({ message: "Invalid policy ID" });

        if (claimAmount > policy.coverageAmount) return res.status(400).json({ message: "Claim amount exceeds policy coverage" });

        const newClaim = new Claim({ policyId, claimAmount });
        await newClaim.save();

        res.status(201).json({ message: "Claim created successfully", data: newClaim });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClaimStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const claim = await Claim.findByIdAndUpdate(id, { status }, { new: true });
        if (!claim) return res.status(404).json({ message: "Claim not found" });

        res.json({ message: "Claim status updated successfully", data: claim });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate('policyId');
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
