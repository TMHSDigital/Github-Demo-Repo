const request = require('supertest');
const app = require('../../../src/api/index');

describe('API Integration Tests', () => {
  describe('Data Flow', () => {
    it('should retrieve data with the correct structure', async () => {
      const res = await request(app).get('/api/data');
      
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      
      // Check if every item has the required properties
      res.body.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('status');
        
        // Verify that id is a number
        expect(typeof item.id).toBe('number');
        
        // Verify that name is a string
        expect(typeof item.name).toBe('string');
        
        // Verify that status is one of the expected values
        expect(['active', 'in-progress', 'planned']).toContain(item.status);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid routes appropriately', async () => {
      const res = await request(app).get('/api/nonexistent');
      expect(res.statusCode).toEqual(404);
    });

    it('should handle server errors gracefully', async () => {
      // Simulate a server error by sending an invalid request
      const res = await request(app)
        .post('/api/data')
        .send({ invalid: 'data' });
      
      // This should either return a 404 (not found) or a 500 (server error)
      expect([404, 500]).toContain(res.statusCode);
    });
  });
}); 