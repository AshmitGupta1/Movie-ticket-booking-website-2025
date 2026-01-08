import express from 'express';
import { webhookLimiter } from '../middleware/rateLimiter.js';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Stripe webhook - must use raw body
router.post('/stripe', webhookLimiter, express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
