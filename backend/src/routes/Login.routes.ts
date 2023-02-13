import * as express from 'express';
import { LoginController } from '../controllers';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  new LoginController().login,
)

export default loginRouter;