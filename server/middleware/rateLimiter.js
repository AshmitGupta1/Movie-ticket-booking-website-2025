import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for booking creation
export const bookingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 booking attempts per minute
  message: 'Too many booking attempts, please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for webhooks
export const webhookLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Allow 30 webhook calls per minute
  message: 'Too many webhook requests.',
  standardHeaders: true,
  legacyHeaders: false,
});
