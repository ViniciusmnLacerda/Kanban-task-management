import * as express from 'express';
import { AccountController } from '../controllers';
import { tokenMiddleare } from '../middlwares';

const accountRouter = express.Router();

accountRouter.get(
  '/:id',
  tokenMiddleare,
  new AccountController().getAccount,
);

export default accountRouter;