const request = require('supertest');
const app = require('../src/app');
const Policy = require('../src/models/policy');
const Policyholder = require('../src/models/policyholder');
const jwt = require('jsonwebtoken');

describe('Policy Management', () => {
  let userToken;

  beforeAll(async () => {
    const user = await Policyholder.create({
      name: `Policy User${Date.now()}`,
      email: `user${Date.now()}@test.com`,
      password: 'testpass',
      age: 30
    });

    userToken = jwt.sign({ id: user._id, role: 'policyholder' }, process.env.JWT_SECRET);
  });

  test('Create policy', async () => {
    const res = await request(app)
      .post('/policies')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        policyType: 'Health Insurance',
        coverageAmount: 50000
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.coverageAmount).toBe(50000);
  });
});