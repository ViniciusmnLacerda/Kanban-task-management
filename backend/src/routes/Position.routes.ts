import * as express from 'express';
import { PositionController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { CardsService, ColumnService, MembersService, PositionService } from '../services';
import { MembersValidations } from '../services/validations';

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnService = new ColumnService(membersService);
const cardsService = new CardsService();
const positionService = new PositionService(columnService, cardsService);

const positionRouter = express.Router();

positionRouter.patch(
  '/:database/:id',
  tokenMiddleare,
  new PositionController(positionService).update,
);

export default positionRouter;