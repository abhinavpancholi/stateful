const policyholders = require('../models/policyholder');

exports.createPolicyholder = (req, res) => {
    const { id, name, age } = req.body;

    if (policyholders[id]) return res.status(400).json({ message: "Policyholder ID already exists" });
    if (!/^[a-zA-Z\s]+$/.test(name)) return res.status(400).json({ message: "Invalid name format" });
    if (age < 18) return res.status(400).json({ message: "Policyholder must be at least 18" });

    policyholders[id] = { id, name, age };
    res.status(201).json({ message: "Policyholder created successfully", data: policyholders[id] });
};

exports.updatePolicyholder = (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    if (!policyholders[id]) return res.status(404).json({ message: "Policyholder not found" });
    if (name && !/^[a-zA-Z\s]+$/.test(name)) return res.status(400).json({ message: "Invalid name format" });
    if (age && age < 18) return res.status(400).json({ message: "Policyholder must be at least 18" });

    policyholders[id] = { ...policyholders[id], name: name || policyholders[id].name, age: age || policyholders[id].age };
    res.json({ message: "Policyholder updated successfully", data: policyholders[id] });
};


exports.getAllPolicyholders = (req, res) => res.json(Object.values(policyholders));
