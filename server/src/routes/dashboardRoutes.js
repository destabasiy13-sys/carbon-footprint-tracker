import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { getSummary } from '../controllers/dashboardController.js';

const router = Router();

router.use(requireAuth);

router.get('/summary', getSummary);

export default router;
