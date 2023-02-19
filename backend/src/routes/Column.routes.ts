import * as express from 'express';
import { ColumnController } from '../controllers';
import { columnMiddleware, tokenMiddleare } from '../middlwares';
import { ColumnService, MembersService } from '../services';
import { MembersValidations } from '../services/validations';

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnService = new ColumnService(membersService);

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

columnRouter.delete(
  '/:columnId/:workspaceId',
  tokenMiddleare,
  new ColumnController(columnService).remove,
);

columnRouter.patch(
  '/:columnId',
  tokenMiddleare,
  columnMiddleware,
  new ColumnController(columnService).update,
);

export default columnRouter;