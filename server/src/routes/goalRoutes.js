import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { postGoal, getGoals, deleteGoalHandler } from '../controllers/goalController.js';

const router = Router();

router.use(requireAuth);

router.post('/', postGoal);
router.get('/', getGoals);
router.delete('/:id', deleteGoalHandler);

export default router;
