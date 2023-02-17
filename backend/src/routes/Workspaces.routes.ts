import * as express from 'express';
import { WorkspacesController } from '../controllers';
import { tokenMiddleare, updateWorkspacesMiddleware, workspacesMiddleware } from '../middlwares';
import { MembersService, WorkspacesService } from '../services';
import { MembersValidations, WorkspacesValidations } from '../services/validations';

const membersValidations = new MembersValidations();
const memberService = new MembersService(membersValidations);
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
  new WorkspacesController(workspacesService).remove,
);

workspaceRouter.patch(
  '/:workspaceId',
  tokenMiddleare,
  updateWorkspacesMiddleware,
  new WorkspacesController(workspacesService).update,
);

export default workspaceRouter;