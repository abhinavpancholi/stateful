const mongoose = require('mongoose');


const claimSchema = new mongoose.Schema({
    policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
    claimAmount: { type: Number, required: true },
    claim_update_amount: { type: Number }, // Stores the previous amount before updating
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    claim_date: { type: Date, default: Date.now }, 
    claim_update_date: { type: Date } // Updates whenever status or amount changes
}, { timestamps: true });
module.exports = mongoose.model('Claim', claimSchema);
