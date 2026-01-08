import express from 'express';
import { handleClerkWebhook } from '../controllers/clerkWebhookController.js';

const router = express.Router();

// Clerk webhook
router.post('/clerk', express.json(), handleClerkWebhook);

export default router;
