import express from 'express';
import { authLimiter } from '../middleware/rateLimiter.js';
import { handleClerkWebhook } from '../controllers/clerkWebhookController.js';

const router = express.Router();

// Clerk webhook
router.post('/clerk', authLimiter, express.json(), handleClerkWebhook);

export default router;
