import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliversController from './app/controllers/DeliversController';
import WithdrawController from './app/controllers/WithdrawController';
import DeliveredController from './app/controllers/DeliveredController';
import ProblemAdminController from './app/controllers/ProblemAdminController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';
import checkID from './app/middlewares/checkID';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id', DeliversController.show);
routes.get('/deliveryman/:id/deliveries', checkID, DeliversController.index);

routes.patch(
  '/deliveryman/:id/deliveries/:delivery_id/withdraw',
  checkID,
  WithdrawController.update
);

routes.patch(
  '/deliveryman/:id/deliveries/:delivery_id/delivered',
  upload.single('file'),
  DeliveredController.update
);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.get('/deliveryman/:id', DeliverymanController.show);
routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', checkID, DeliverymanController.update);
routes.delete('/deliveryman/:id', checkID, DeliverymanController.destroy);

routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:id', checkID, DeliveryController.show);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', checkID, DeliveryController.update);
routes.delete('/delivery/:id', checkID, DeliveryController.destroy);

routes.get('/problems', ProblemAdminController.index);
routes.put('/problem/:id/cancel-delivery', ProblemAdminController.update);

routes.get('/recipient', RecipientController.index);
routes.get('/recipient/:id', checkID, RecipientController.show);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', checkID, RecipientController.update);
routes.delete('/recipient/:id', checkID, RecipientController.destroy);

export default routes;
