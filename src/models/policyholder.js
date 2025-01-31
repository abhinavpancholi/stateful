const mongoose = require('mongoose');

const policyholderSchema = new mongoose.Schema({
    name: { type: String, required: true, match: /^[a-zA-Z\s]+$/ },
    age: { type: Number, required: true, min: 18 }
});

module.exports = mongoose.model('Policyholder', policyholderSchema);
