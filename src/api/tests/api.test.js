const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message and available endpoints', async () => {
      const res = await request(app).get('/');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('endpoints');
      expect(Array.isArray(res.body.endpoints)).toBe(true);
    });
  });

  describe('GET /api/data', () => {
    it('should return an array of data items', async () => {
      const res = await request(app).get('/api/data');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      
      // Check data structure
      const firstItem = res.body[0];
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('name');
      expect(firstItem).toHaveProperty('status');
    });
  });

  describe('GET /api/status', () => {
    it('should return server status information', async () => {
      const res = await request(app).get('/api/status');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('environment');
      expect(res.body.status).toEqual('online');
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/non-existent-route');
      expect(res.statusCode).toEqual(404);
    });
  });
}); 