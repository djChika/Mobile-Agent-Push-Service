import ValuesController from '../controllers/ValuesController';
import { Router } from 'express';

const router = Router();

//Get Value
router.get('/', ValuesController.getValue);

export default router;
