import * as express from 'express';
import { PeopleController } from '../controllers';
import { tokenMiddleare } from '../middlwares';
import { PeopleService } from '../services';

const peopleService = new PeopleService();

const personRouter = express.Router();

personRouter.get(
  '/:accountId',
  tokenMiddleare,
  new PeopleController(peopleService).getter,
);

export default personRouter;
