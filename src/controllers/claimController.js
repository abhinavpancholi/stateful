const Claim = require('../models/claim');
const Policy = require('../models/policy')

// Only authorized policyholders can create claims
exports.createClaim = async (req, res) => {
    try {
        if (req.user.role !== 'policyholder') {
            return res.status(403).json({ message: 'Access Denied: Only policyholders can create claims' });
        }
        const claim = new Claim({ ...req.body, policyholderId: req.user.id, claim_date: new Date() });
        await claim.save();
        res.status(201).json({ message: "Claim created successfully", data: claim });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Only admin can update claim status & approved amount
exports.updateClaim = async (req, res) => {
    const { id } = req.params;
    const { status, claim_update_amount } = req.body; // Use claim_update_amount as per schema

    try {
        const claim = await Claim.findById(id);
        if (!claim) return res.status(404).json({ message: "Claim not found" });

        // Ensure only admins can update
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Only admins can update claims' });
        }

        // Update claim fields
        if (status) claim.status = status;
        if (claim_update_amount) {
            claim.claim_update_amount = claim_update_amount; // Update the approved amount
        }
        claim.claim_update_date = new Date(); // Update the claim update date

        await claim.save(); // Save the updated claim to the database
        res.json({ message: "Claim updated successfully", data: claim });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all claims (only accessible by admin)
exports.getAllClaims = async (req, res) => {
    try {
        // Ensure only admins can access
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Only admins can view all claims' });
        }

        const claims = await Claim.find().populate('policyId'); // Populate policy details if needed
        res.json(claims);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single claim by ID (only accessible by admin)
exports.getClaimById = async (req, res) => {
    const { id } = req.params;

    try {
        const claim = await Claim.findById(id).populate('policyId'); // Populate policy details if needed
        if (!claim) return res.status(404).json({ message: "Claim not found" });

        // Allow admin or the policyholder who created the claim to access
        if (req.user.role !== 'admin' && req.user.role !== 'policyholder') {
            return res.status(403).json({ message: 'Access Denied: You are not authorized to view this claim' });
        }

        res.json(claim);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a claim (only accessible by admin)
exports.deleteClaim = async (req, res) => {
    const { id } = req.params;

    try {
        // Ensure only admins can delete
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Only admins can delete claims' });
        }

        const claim = await Claim.findByIdAndDelete(id);
        if (!claim) return res.status(404).json({ message: "Claim not found" });
        res.json({ message: "Claim deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getClaimsByLoggedInUser = async (req, res) => {
    try {
      // Get the logged-in user's ID from the JWT token
      const policyholderId = req.user.id;
        
      const policies = await Policy.find({ policyholderId }).select("_id");

      const policyIds = policies.map(policy => policy._id);

      // Find policies associated with the logged-in policyholder's ID
      const claim = await Claim.find({ policyId: { $in: policyIds } });
  
      res.json(claim);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
    
  };

//   exports.getClaimsByLoggedInUser = async (req, res) => {
//         try {
//             // Get the logged-in user's ID from the JWT token
//             const policyholderId = req.user.id;
    
//             // Find all policies that belong to the logged-in policyholder
//             const policies = await Policy.find({ policyholderId }).select("_id");
    
//             // Extract policy IDs from the policies
//             const policyIds = policies.map(policy => policy._id);
    
//             // Find claims that belong to these policy IDs
//             const claims = await Claim.find({ policyId: { $in: policyIds } });
    
//             res.json(claims);
//         } catch (error) {
//             res.status(500).json({ message: "Server error", error: error.message });
//         }
//     };

  // Get claims for the current policyholder
exports.getMyClaims = async (req, res) => {
  try {
    if (req.user.role !== 'policyholder') {
      return res.status(403).json({ message: 'Access Denied' });
    }
    const claims = await Claim.find({ policyholderId: req.user.id }).populate('policyId');
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};