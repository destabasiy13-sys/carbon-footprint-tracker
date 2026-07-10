import { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import {
  getActivities,
  getActivity,
  postActivity,
  putActivity,
  deleteActivityHandler,
} from '../controllers/activityController.js';

const router = Router();

router.use(requireAuth);

router.get('/', getActivities);
router.get('/:id', getActivity);
router.post('/', postActivity);
router.put('/:id', putActivity);
router.delete('/:id', deleteActivityHandler);

export default router;
