import * as express from 'express';
import { MembersController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { MembersService } from '../services';
import { MembersValidations } from '../services/validations';

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);

const membersRouter = express.Router();

membersRouter.get(
  '/:workspaceId',
  tokenMiddleare,
  new MembersController(membersService).getMembers,
);

membersRouter.patch(
  '/:workspaceId/:accountId',
  tokenMiddleare,
  new MembersController(membersService).toggleAdmin,
);

export default membersRouter;