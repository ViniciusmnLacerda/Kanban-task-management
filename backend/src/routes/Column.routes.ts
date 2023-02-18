import * as express from 'express';
import { ColumnController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { ColumnService } from '../services';
import { ColumnValidations } from '../services/validations';

const columnValidations = new ColumnValidations();
const columnService = new ColumnService(columnValidations);

const columnRouter = express.Router();

columnRouter.get(
  '/:workspaceId',
  tokenMiddleare,
  new ColumnController(columnService).getter,
);

export default columnRouter;