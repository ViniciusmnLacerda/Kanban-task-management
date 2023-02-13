import * as express from 'express';
import { RegisterController } from '../controllers';
import { registerMiddleware } from '../middlwares';

const registerRouter = express.Router();

registerRouter.post(
  '/',
  registerMiddleware,
  new RegisterController().register,
)

export default registerRouter;