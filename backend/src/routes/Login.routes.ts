import * as express from 'express';
import { LoginController } from '../controllers';
import { loginMiddleware } from '../middlwares';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  loginMiddleware,
  new LoginController().login,
)

export default loginRouter;