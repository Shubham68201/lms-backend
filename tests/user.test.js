import request from 'supertest';
import mongoose from 'mongoose'; // Add this
import app from '../app.js';
import connectToDB from '../configs/dbConn.js'; // Add this

describe('User Authentication API', () => {
  // Connect before tests start
  beforeAll(async () => {
    await connectToDB();
  });

  // Close after tests finish to solve "Open Handle" (TCPSERVERWRAP)
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  describe('POST /api/v1/user/register', () => {
    it('should return 400 when all fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/user/register')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('All fields are required');
    });
    
    it('should return 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/v1/user/register')
        .send({
          fullName: 'Test User',
          password: 'Test@123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should return 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/v1/user/register')
        .send({
          fullName: 'Test User',
          email: 'test@example.com'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should return 400 when fullName is missing', async () => {
      const res = await request(app)
        .post('/api/v1/user/register')
        .send({
          email: 'test@example.com',
          password: 'Test@123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    // NEW: Test name length validation
    it('should return 400 when name is too short', async () => {
      const res = await request(app)
        .post('/api/v1/user/register')
        .send({
          fullName: 'Jo',
          email: 'test@example.com',
          password: 'Test@123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('POST /api/v1/user/login', () => {
    it('should return 400 when credentials are missing', async () => {
      const res = await request(app)
        .post('/api/v1/user/login')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Email and Password are required');
    });

    // NEW: Test invalid credentials
    it('should return 401 when user does not exist', async () => {
      const res = await request(app)
        .post('/api/v1/user/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'WrongPass@123'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  // NEW: Test logout endpoint
  describe('POST /api/v1/user/logout', () => {
    it('should return 200 and clear cookie', async () => {
      const res = await request(app)
        .post('/api/v1/user/logout');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('logged out');
    });
  });
});