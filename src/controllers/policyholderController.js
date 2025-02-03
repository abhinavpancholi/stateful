const Policyholder = require('../models/policyholder');

exports.createPolicyholder = async (req, res) => {
    try {
        const policyholder = new Policyholder(req.body);
        await policyholder.save();
        res.status(201).json({ message: "Policyholder created successfully", data: policyholder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllPolicyholders = async (req, res) => {
    try {
        const policyholders = await Policyholder.find();
        res.json(policyholders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updatePolicyholder = async (req, res) => {
    try {
        const policyholder = await Policyholder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Policyholder updated successfully", data: policyholder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deletePolicyholder = async (req, res) => {
    try {
        await Policyholder.findByIdAndDelete(req.params.id);
        res.json({ message: "Policyholder deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};