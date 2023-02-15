import * as express from 'express';
import { WorkspacesController } from '../controllers';
import { tokenMiddleare } from '../middlwares';

const workspaceRouter = express.Router();

workspaceRouter.get(
  '/:accountId',
  tokenMiddleare,
  new WorkspacesController().getWorkspaces,
);

export default workspaceRouter;