import { Router } from 'express';
import SubscribersController from '../controllers/SubscribersController';

const router = Router();

router.post('/', SubscribersController.push);
router.post('/all', SubscribersController.pushAll);

export default router;
