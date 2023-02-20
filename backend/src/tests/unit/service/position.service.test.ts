import * as chai from 'chai';
import { CardsService, ColumnService, MembersService, PositionService } from '../../../services';
import { MembersValidations, PositionValidations } from '../../../services/validations';

const { expect } = chai;

const positionValidations = new PositionValidations();
const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnService = new ColumnService(membersService);
const cardsService = new CardsService();
const positionService = new PositionService(columnService, cardsService, positionValidations);

describe('Position service test', function() {
  describe()
})