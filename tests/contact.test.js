import request from 'supertest';
import app from '../app.js';

describe('Contact Us API', () => {
  describe('POST /api/v1/contact', () => {
    it('should return 400 when all fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
    });
    
    it('should return 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({
          email: 'test@example.com',
          message: 'Test message'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should return 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({
          name: 'Test User',
          message: 'Test message'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should return 400 when message is missing', async () => {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    // NEW: Test with valid data (will be mocked by setup.js)
    it('should return 200 with valid contact form data', async () => {
      const res = await request(app)
        .post('/api/v1/contact')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a test message for the LMS platform.'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('submitted successfully');
    });
  });
});