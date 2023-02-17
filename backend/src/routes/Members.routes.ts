import * as express from 'express';
import { MembersController } from '../controllers';
import { membersMiddleware, tokenMiddleare } from '../middlwares';
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

membersRouter.put(
  '/:workspaceId',
  tokenMiddleare,
  membersMiddleware,
  new MembersController(membersService).insert,
);

export default membersRouter;