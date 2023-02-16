import * as express from 'express';
import { LoginController } from '../controllers';
import { loginMiddleware } from '../middlwares';
import { LoginService } from '../services';
import { UserValidations } from '../services/validations';
import { HandleToken } from '../utils';

const handleToken = new HandleToken();
const userValidations = new UserValidations();
const loginService = new LoginService(handleToken, userValidations);

const loginRouter = express.Router();

loginRouter.post(
  '/',
  loginMiddleware,
  new LoginController(loginService).login,
);

export default loginRouter;
