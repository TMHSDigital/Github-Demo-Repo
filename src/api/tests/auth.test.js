const request = require('supertest');
const app = require('../index');

describe('Authentication', () => {
  describe('POST /api/auth/login', () => {
    it('should return 400 if username or password is missing', async () => {
      // Test missing username
      let res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'test123' });
        
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Bad Request');
      
      // Test missing password
      res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'test' });
        
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Bad Request');
    });
    
    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'invalid', password: 'invalid' });
        
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Unauthorized');
    });
    
    it('should return token and user info for valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'demo', password: 'demo123' });
        
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user).toHaveProperty('username');
      expect(res.body.user).toHaveProperty('role');
      expect(res.body.user).not.toHaveProperty('password');
    });
  });
  
  describe('Protected Routes', () => {
    let userToken;
    let adminToken;
    
    // Get tokens before tests
    beforeAll(async () => {
      // Get user token
      const userRes = await request(app)
        .post('/api/auth/login')
        .send({ username: 'demo', password: 'demo123' });
      userToken = userRes.body.token;
      
      // Get admin token
      const adminRes = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'admin123' });
      adminToken = adminRes.body.token;
    });
    
    it('should deny access without token', async () => {
      const res = await request(app).get('/api/protected');
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Unauthorized');
    });
    
    it('should grant access with valid user token', async () => {
      const res = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('data');
    });
    
    it('should deny access to admin routes for non-admin users', async () => {
      const res = await request(app)
        .get('/api/admin')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Forbidden');
    });
    
    it('should grant access to admin routes for admin users', async () => {
      const res = await request(app)
        .get('/api/admin')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('adminData');
    });
  });
}); 