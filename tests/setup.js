// tests/setup.js
// Runs BEFORE all tests
import { jest } from '@jest/globals';

// Set test environment first
process.env.NODE_ENV = 'test';

// Mock all required environment variables
process.env.JWT_SECRET = 'test-jwt-secret-for-testing-only';
process.env.JWT_EXPIRY = '7d';
process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud';
process.env.CLOUDINARY_API_KEY = 'test-api-key';
process.env.CLOUDINARY_API_SECRET = 'test-api-secret';
process.env.RAZORPAY_KEY_ID = 'test-razorpay-key';
process.env.RAZORPAY_SECRET = 'test-razorpay-secret';
process.env.RAZORPAY_PLAN_ID = 'test-plan-id';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lms-test';
process.env.FRONTEND_URL = 'http://localhost:3000';
process.env.CONTACT_US_EMAIL = 'test@lms.com';
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_USERNAME = 'test-smtp-user';
process.env.SMTP_PASSWORD = 'test-smtp-pass';
process.env.SMTP_FROM_EMAIL = 'noreply@lms.com';

// Reduce console noise during tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: jest.fn(), // Silent
  debug: jest.fn(), // Silent
  info: jest.fn(), // Silent
  warn: originalConsole.warn, // Keep warnings
  error: originalConsole.error, // Keep errors
};

// Mock nodemailer to prevent actual email sending
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-email-id' }),
  }),
}));