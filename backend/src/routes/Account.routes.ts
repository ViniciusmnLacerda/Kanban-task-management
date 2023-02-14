import * as express from 'express';
import { AccountController } from '../controllers';

const accountRouter = express.Router();

accountRouter.get(
  '/:id',
  new AccountController().getAccount,
)

export default accountRouter;