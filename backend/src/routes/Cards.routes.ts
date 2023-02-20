import * as express from 'express';
import { CardsController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { CardsService, MembersService } from '../services';
import { MembersValidations } from '../services/validations';

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const cardsService = new CardsService(membersService);

const cardsRouter = express.Router();

cardsRouter.get(
  '/:workspaceId',
  tokenMiddleare,
  new CardsController(cardsService).getter,
);

export default cardsRouter;
