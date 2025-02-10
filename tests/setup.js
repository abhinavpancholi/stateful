// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri);
  
//   // Override the original connection in app.js
//   require('../src/app'); // This ensures app.js uses the in-memory connection
// }, 30000); // Increase timeout to 30 seconds

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany();
//   }
// });

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

module.exports = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  process.env.MONGO_URI = uri;
  process.env.JWT_SECRET = 'test-secret';
  
  await mongoose.connect(uri, {
    useNewUrlParser: false,
    useUnifiedTopology: false
  });
};

module.exports.teardown = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};