const Claim = require('../models/claim');
const Policy = require('../models/policy');

exports.createClaim = async (req, res) => {
    try {
        const { policyId, claimAmount } = req.body;

        const policy = await Policy.findById(policyId);
        if (!policy) return res.status(400).json({ message: "Invalid policy ID" });
        if (claimAmount > policy.coverageAmount) return res.status(400).json({ message: "Claim amount exceeds policy coverage" });

        const claim = new Claim({ policyId, claimAmount });
        await claim.save();

        res.status(201).json({ message: "Claim created successfully", data: claim });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate('policyId');
        res.json(claims);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const { claimAmount, status } = req.body;

        const claim = await Claim.findById(id);
        if (!claim) return res.status(404).json({ message: "Claim not found" });

        if (claimAmount) {
            claim.claim_update_amount = claim.claimAmount;
            claim.claimAmount = claimAmount;
            claim.claim_update_date = new Date();
        }

        if (status) {
            claim.status = status;
            claim.claim_update_date = new Date();
        }

        await claim.save();
        res.json({ message: "Claim updated successfully", data: claim });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteClaim = async (req, res) => {
    try {
        await Claim.findByIdAndDelete(req.params.id);
        res.json({ message: "Claim deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
