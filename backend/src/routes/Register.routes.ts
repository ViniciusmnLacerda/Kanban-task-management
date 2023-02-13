import * as express from 'express';
import { RegisterController } from '../controllers';

const registerRouter = express.Router();

registerRouter.post(
  '/',
  new RegisterController().register,
)

export default registerRouter;