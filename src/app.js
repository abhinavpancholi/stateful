require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(bodyParser.json());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req,res)=>{
  res.send("Welcome! from the backend")
})

app.use('/policyholders', policyholderRoutes);
app.use('/policies', policyRoutes);
app.use('/claims', claimRoutes);
app.use('/auth', authRoutes);

module.exports = app;