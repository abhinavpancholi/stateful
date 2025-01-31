const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
    claimAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    claimDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', claimSchema);
