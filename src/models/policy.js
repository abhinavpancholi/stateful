const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyholderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policyholder', required: true },
    policyType: { type: String, enum: ["Health Insurance", "Car Insurance", "Home Insurance"], required: true },
    coverageAmount: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ["active", "inactive"], default: "active" }, // Add status field
    claimCount: { type: Number, default: 0 } // Add claimCount field
}, { timestamps: true });

// const policySchema = new mongoose.Schema({
//     policyholderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policyholder', required: true },
//     // policyType: { type: String, enum: ["Health Insurance", "Car Insurance", "Home Insurance"], required: true },
//     policyType: { type: String, enum: ["Health Insurance", "Car Insurance", "Home Insurance"], required: true },
//     coverageAmount: { type: Number, required: true, min: 1 }
// }, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
