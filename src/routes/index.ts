import { Router } from 'express';
import values from './values';
import subscribers from './subscribers';

const routes = Router();

routes.use('/api/values', values);
routes.use('/api/push', subscribers);

export default routes;
