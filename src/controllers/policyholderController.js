const Policyholder = require('../models/policyholder');

exports.createPolicyholder = async (req, res) => {
    try {
        const { name, age } = req.body;

        const newPolicyholder = new Policyholder({ name, age });
        await newPolicyholder.save();

        res.status(201).json({ message: "Policyholder created successfully", data: newPolicyholder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePolicyholder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;

        const policyholder = await Policyholder.findByIdAndUpdate(id, { name, age }, { new: true });
        if (!policyholder) return res.status(404).json({ message: "Policyholder not found" });

        res.json({ message: "Policyholder updated successfully", data: policyholder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPolicyholders = async (req, res) => {
    try {
        const policyholders = await Policyholder.find();
        res.json(policyholders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
