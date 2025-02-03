const mongoose = require('mongoose');

const policyholderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 18 }
});

module.exports = mongoose.model('Policyholder', policyholderSchema);
