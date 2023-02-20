import * as express from 'express';
import { CardsController } from '../controllers';
import { cardsMiddleware, tokenMiddleare } from '../middlwares';
import { CardsService } from '../services';

const cardsService = new CardsService();

const cardsRouter = express.Router();

cardsRouter.get(
  '/:columnId',
  tokenMiddleare,
  new CardsController(cardsService).getter,
);

cardsRouter.post(
  '/:columnId',
  tokenMiddleare,
  cardsMiddleware,
  new CardsController(cardsService).create,
);

cardsRouter.delete(
  '/:cardId/:columnId',
  tokenMiddleare,
  new CardsController(cardsService).remove,
);

export default cardsRouter;
