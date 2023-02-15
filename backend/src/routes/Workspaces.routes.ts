import * as express from 'express';
import { WorkspacesController } from '../controllers';
import { tokenMiddleare, workspacesMiddleware } from '../middlwares';

const workspaceRouter = express.Router();

workspaceRouter.get(
  '/:accountId',
  tokenMiddleare,
  new WorkspacesController().getAll,
);

workspaceRouter.post(
  '/',
  tokenMiddleare,
  workspacesMiddleware,
  new WorkspacesController().create,
);

workspaceRouter.get(
  '/members/:workspaceId',
  new WorkspacesController().getMembers,
);

export default workspaceRouter;