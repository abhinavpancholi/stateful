const mongoose = require('mongoose');

const policyholderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 18 },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Policyholder', policyholderSchema);
