import * as express from 'express';
import { PositionController } from '../controllers';
import { insideMiddleware, outsideMiddleware, tokenMiddleare } from '../middlwares';
import { CardsService, ColumnService, MembersService, PositionService } from '../services';
import { MembersValidations, PositionValidations } from '../services/validations';

const positionValidations = new PositionValidations();
const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnService = new ColumnService(membersService);
const cardsService = new CardsService();
const positionService = new PositionService(columnService, cardsService, positionValidations);

const positionRouter = express.Router();

positionRouter.patch(
  '/inside/:database/:id',
  tokenMiddleare,
  insideMiddleware,
  new PositionController(positionService).updateInside,
);

positionRouter.patch(
  '/outside/:cardId',
  tokenMiddleare,
  outsideMiddleware,
  new PositionController(positionService).updateOutside,
);

export default positionRouter;