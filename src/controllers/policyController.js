const Policy = require('../models/policy');

exports.createPolicy = async (req, res) => {
    try {
        const policy = new Policy(req.body);
        await policy.save();
        res.status(201).json({ message: "Policy created successfully", data: policy });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find().populate('policyholderId');
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updatePolicy = async (req, res) => {
    try {
        const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Policy updated successfully", data: policy });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deletePolicy = async (req, res) => {
    try {
        await Policy.findByIdAndDelete(req.params.id);
        res.json({ message: "Policy deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
