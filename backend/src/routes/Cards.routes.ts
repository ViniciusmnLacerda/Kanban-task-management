import * as express from 'express';
import { CardsController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { CardsService } from '../services';

const cardsService = new CardsService();

const cardsRouter = express.Router();

cardsRouter.get(
  '/:workspaceId',
  tokenMiddleare,
  new CardsController(cardsService).getter,
);

export default cardsRouter;
