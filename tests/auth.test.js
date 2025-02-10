
const request = require('supertest');
const app = require('../src/app');
const Admin = require('../src/models/admin');
const Policyholder = require('../src/models/policyholder');

describe('Authentication', () => {
  let testUserId;
  let ran = Math.random();

  beforeAll(async () => {
    // Create test admin
    await Admin.create({
      name: `Test Admin ${ran}`,
      email: `admin${ran}@test.com`,
      password: 'adminpass'
    });

    // Create test policyholder
    const ph = await Policyholder.create({
      name: `Test User ${ran}`,
      email: `user${ran}@test.com`,
      password: 'userpass',
      age: 30
    });
    testUserId = ph._id;
  }, 30000);

  test('Admin login with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/admin/login')
      .send({ 
        email: `admin${ran}@test.com`, 
        password: 'adminpass' 
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Admin login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/admin/login')
      .send({ email: 'admin@test.com', password: 'wrongpass' });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid credentials');
  });

  test('Policyholder login with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/policyholder/login')
      .send({ email: `user${ran}@test.com`, password: 'userpass' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});