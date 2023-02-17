import * as express from 'express';
import { AccountController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { AccountService } from '../services';

const accountRouter = express.Router();
const accountService = new AccountService();

accountRouter.get(
  '/:id',
  tokenMiddleare,
  new AccountController(accountService).getter,
);

export default accountRouter;