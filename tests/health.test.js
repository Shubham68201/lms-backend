import request from 'supertest';
import app from '../app.js';

describe('LMS Health Check', () => {
  it('should return pong when server is running', async () => {
    const res = await request(app).get('/ping');
    
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Pong');
  });
  
  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/api/v1/nonexistent');
    
    expect(res.statusCode).toBe(404);
  });
});