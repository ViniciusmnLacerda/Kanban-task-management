import * as express from 'express';
import { RegisterController } from '../controllers';
import { registerMiddleware } from '../middlwares';
import { RegisterService } from '../services';
import { UserValidations } from '../services/validations';

const userValidations = new UserValidations();
const registerService = new RegisterService(userValidations);

const registerRouter = express.Router();

registerRouter.post(
  '/',
  registerMiddleware,
  new RegisterController(registerService).register,
);

export default registerRouter;