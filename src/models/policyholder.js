const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const policyholderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true,
        match: [emailRegex, 'Please enter a valid email address'] 
     },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
});

module.exports = mongoose.model('Policyholder', policyholderSchema);
