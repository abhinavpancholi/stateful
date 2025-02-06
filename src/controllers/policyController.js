const Policy = require('../models/policy');

// Only authorized policyholders can create policies
// exports.createPolicy = async (req, res) => {
//     try {
//         if (req.user.role !== 'policyholder') {
//             return res.status(403).json({ message: 'Access Denied: Only policyholders can create policies' });
//         }
//         const policy = new Policy({ ...req.body, policyholderId: req.user.id });
//         await policy.save();
//         res.status(201).json({ message: "Policy created successfully", data: policy });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

exports.createPolicy = async (req, res) => {
    try {
        if (req.user.role !== 'policyholder') {
            return res.status(403).json({ message: 'Access Denied: Only policyholders can create policies' });
        }

        // Use policyholderId from the JWT token
        const policyholderId = req.user.id;

        // Create the policy with the logged-in user's ID
        const policy = new Policy({ ...req.body, policyholderId });
        await policy.save();

        res.status(201).json({ message: "Policy created successfully", data: policy });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getPoliciesByLoggedInUser = async (req, res) => {
    try {
      // Get the logged-in user's ID from the JWT token
      const policyholderId = req.user.id;
  
      // Find policies associated with the logged-in policyholder's ID
      const policies = await Policy.find({ policyholderId });
  
      res.json(policies);
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

exports.getPolicyById = async (req, res) => {
    const { id } = req.params;

    try {
        const policy = await Policy.findById(id).populate('policyholderId');
        if (!policy) return res.status(404).json({ message: "Policy not found" });

        // Allow admin or the policyholder who owns the policy to access
        if (req.user.role !== 'admin' && req.user.role !== 'policyholder') {
            return res.status(403).json({ message: 'Access Denied: You are not authorized to view this policy' });
        }

        res.json(policy);
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