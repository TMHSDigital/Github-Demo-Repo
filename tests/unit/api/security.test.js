const request = require('supertest');
const app = require('../../../src/api/index');

describe('Security Tests', () => {
  describe('Environment information exposure', () => {
    it('should not expose sensitive environment info in production', async () => {
      // Mock the NODE_ENV to be production
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const res = await request(app).get('/api/status');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('timestamp');
      
      // Should NOT expose environment in production
      expect(res.body.environment).toBeUndefined();
      
      // Restore the original NODE_ENV
      process.env.NODE_ENV = originalEnv;
    });

    it('should expose environment info in development', async () => {
      // Mock the NODE_ENV to be development
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const res = await request(app).get('/api/status');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('environment');
      expect(res.body.environment).toEqual('development');
      
      // Restore the original NODE_ENV
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Error message exposure', () => {
    it('should not expose detailed error messages in production', async () => {
      // Mock the NODE_ENV to be production
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      // Trigger an error
      // This is a mock - in a real test, you would need to trigger an actual error
      const res = await request(app).get('/api/nonexistent');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
      
      // In production, detailed error message should not be exposed
      if (res.body.message) {
        expect(res.body.message).not.toContain('stack');
        expect(res.body.message).not.toContain('at ');
      }
      
      // Restore the original NODE_ENV
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Headers security', () => {
    it('should set security headers', async () => {
      const res = await request(app).get('/');
      
      // Check for security headers set by helmet
      expect(res.headers).toHaveProperty('x-content-type-options');
      expect(res.headers['x-content-type-options']).toEqual('nosniff');
      
      expect(res.headers).toHaveProperty('x-xss-protection');
      // The exact value may vary based on helmet version
      
      expect(res.headers).toHaveProperty('x-frame-options');
      expect(res.headers['x-frame-options']).toEqual('SAMEORIGIN');
    });
  });
}); 