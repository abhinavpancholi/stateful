const request = require('supertest');
const app = require('../src/app');
const { startDB, stopDB, clearDB } = require('../setup');
const jwt = require('jsonwebtoken');

let userToken, adminToken, policyId;

describe('Claim Management', () => {
  beforeAll(async () => {
    await startDB();
    
    // Create test policyholder
    const User = require('../src/models/policyholder');
    const user = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'testpass',
      age: 30
    });

    // Create test policy
    const Policy = require('../src/models/policy');
    const policy = await Policy.create({
      policyholderId: user._id,
      policyType: 'Health Insurance',
      coverageAmount: 10000,
      status: 'active'
    });
    policyId = policy._id;

    // Generate tokens
    userToken = jwt.sign({ id: user._id, role: 'policyholder' }, 'test-secret');
    adminToken = jwt.sign({ id: 'admin-id', role: 'admin' }, 'test-secret');
  });

  afterAll(async () => {
    await stopDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  test('Create claim with auto-approval', async () => {
    const res = await request(app)
      .post('/claims')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        policyId,
        claimAmount: 5000
      });

    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('Approved');
  });

  test('Prevent claim exceeding coverage', async () => {
    const res = await request(app)
      .post('/claims')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        policyId,
        claimAmount: 15000
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Claim amount exceeds policy coverage');
  });

  test('Prevent claim on inactive policy', async () => {
    const Policy = require('../src/models/policy');
    await Policy.findByIdAndUpdate(policyId, { status: 'inactive' });

    const res = await request(app)
      .post('/claims')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        policyId,
        claimAmount: 5000
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Claims cannot be made on inactive policies');
  });
});