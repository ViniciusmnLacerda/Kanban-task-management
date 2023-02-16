import * as express from 'express';
import { MembersController } from '../controllers';
import { tokenMiddleare } from '../middlwares';

const membersRouter = express.Router();

membersRouter.get(
  '/:workspaceId',
  tokenMiddleare,
  new MembersController().getMembers,
);

membersRouter.patch(
  '/:workspaceId/:accountId',
  tokenMiddleare,
  new MembersController().toggleAdmin,
);

export default membersRouter;