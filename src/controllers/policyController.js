const Policy = require('../models/policy');
const Policyholder = require('../models/policyholder');

exports.createPolicy = async (req, res) => {
    try {
        const { policyholderId, policyType, coverageAmount } = req.body;

        const policyholder = await Policyholder.findById(policyholderId);
        if (!policyholder) return res.status(400).json({ message: "Invalid policyholder ID" });

        const newPolicy = new Policy({ policyholderId, policyType, coverageAmount });
        await newPolicy.save();

        res.status(201).json({ message: "Policy created successfully", data: newPolicy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePolicy = async (req, res) => {
    try {
        const { id } = req.params;
        const { policyType, coverageAmount } = req.body;

        const policy = await Policy.findByIdAndUpdate(id, { policyType, coverageAmount }, { new: true });
        if (!policy) return res.status(404).json({ message: "Policy not found" });

        res.json({ message: "Policy updated successfully", data: policy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().populate('policyholderId');
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
