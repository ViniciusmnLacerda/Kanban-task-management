import * as express from 'express';
import { ColumnController } from '../controllers';
import { columnMiddleware, tokenMiddleare } from '../middlwares';
import { ColumnService, MembersService } from '../services';
import { ColumnValidations, MembersValidations } from '../services/validations';

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnValidations = new ColumnValidations();
const columnService = new ColumnService(membersService, columnValidations);

const columnRouter = express.Router();

columnRouter.get(
  '/:workspaceId',
  tokenMiddleare,
  new ColumnController(columnService).getter,
);

columnRouter.post(
  '/:workspaceId',
  tokenMiddleare,
  columnMiddleware,
  new ColumnController(columnService).create,
);

export default columnRouter;