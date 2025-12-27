import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import connectToDB from '../configs/dbConn.js';

describe('Course API', () => {
  // Increase timeout for DB operations
  jest.setTimeout(10000);

  beforeAll(async () => {
    await connectToDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/v1/courses', () => {
    it('should return 200 and fetch all courses', async () => {
      const res = await request(app).get('/api/v1/courses');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('All courses');
      expect(Array.isArray(res.body.courses)).toBe(true);
    });
  });
  
  describe('POST /api/v1/courses', () => {
    it('should return 401 when user is not authenticated', async () => {
      const res = await request(app)
        .post('/api/v1/courses')
        .send({
          title: 'Test Course',
          description: 'Test Description for testing purposes',
          category: 'Programming',
          createdBy: 'Test Instructor'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('GET /api/v1/courses/:id', () => {
    it('should return 401 for unauthenticated access to lectures', async () => {
      const res = await request(app).get('/api/v1/courses/658af1234567890123456789');
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});