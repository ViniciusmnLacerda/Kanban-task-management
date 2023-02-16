import * as express from 'express';
import { WorkspacesController } from '../controllers';
import { tokenMiddleare, workspacesMiddleware } from '../middlwares';
import { MembersService, WorkspacesService } from '../services';
import { WorkspacesValidations } from '../services/validations';

const memberService = new MembersService();
const workspacesValidations = new WorkspacesValidations();
const workspacesService = new WorkspacesService(memberService, workspacesValidations);

const workspaceRouter = express.Router();

workspaceRouter.get(
  '/:accountId',
  tokenMiddleare,
  new WorkspacesController(workspacesService).getAll,
);

workspaceRouter.post(
  '/',
  tokenMiddleare,
  workspacesMiddleware,
  new WorkspacesController(workspacesService).create,
);

workspaceRouter.delete(
  '/:workspaceId',
  tokenMiddleare,
  new WorkspacesController(workspacesService).delete,
);
export default workspaceRouter;