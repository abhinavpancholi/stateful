const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors'); iska koi kaam nhi hai yaha coz frontend se data kaha laare hai hum koi

const policyholderRoutes = require('./routes/policyholderRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();
// app.use(cors());
app.use(bodyParser.json());

app.use('/policyholders', policyholderRoutes);
app.use('/policies', policyRoutes);
app.use('/claims', claimRoutes);

module.exports = app;
