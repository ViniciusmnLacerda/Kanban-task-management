import * as chai from 'chai';
import * as sinon from 'sinon';
import cardsModel from '../../../database/models/Cards';
import cardsColumnModel from '../../../database/models/CardsColumn';
import columnModel from '../../../database/models/Column';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { CardsService, ColumnService, MembersService, PositionService } from '../../../services';
import { MembersValidations, PositionValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import {
  cardsOutput,
  columnsOutput, invalidCardsPosition,
  invalidCardsPositionEqual, invalidDatabaseInput,
  invalidEqualPositionInput,
  invalidNewPositionInput,
  validInput,
  validInputCard
} from '../../mocks/position.mocks';

const { expect } = chai;

const positionValidations = new PositionValidations();
const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnService = new ColumnService(membersService);
const cardsService = new CardsService();
const positionService = new PositionService(columnService, cardsService, positionValidations);

describe('Position service test', function() {
  describe('changing column position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid database should return error', async function() {
      try {
        await positionService.updateInside(invalidDatabaseInput, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Invalid database');
      }
    });

    it('with invalid new position should return error', async function() {
      sinon.stub(columnService, 'getter').resolves(columnsOutput as columnModel[] | any);

      try {
        await positionService.updateInside(invalidNewPositionInput, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Invalid positions');
      }
    });

    it('with equal old and new position should return error', async function() {
      sinon.stub(columnService, 'getter').resolves(columnsOutput as columnModel[] | any);

      try {
        await positionService.updateInside(invalidEqualPositionInput, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Invalid positions');
      }
    });

    it('successfully', async function() {
      sinon.stub(columnService, 'getter').resolves(columnsOutput as columnModel[] | any);
      const stubeCreate = sinon.stub(columnWorkspacesModel, 'update').resolves([1]);

      await positionService.updateInside(validInput, tokenVerifyOutput);
      expect(stubeCreate).to.have.been.calledWith({ position: 1 }, { where: { workspaceId: 1, columnId: 1 } });
    });
  });

  describe('changing cards position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid new position should return error', async function() {
      sinon.stub(cardsService, 'getter').resolves(cardsOutput as cardsModel[] | any);

      try {
        await positionService.updateInside(invalidCardsPosition, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Invalid positions');
      }
    });

    it('with equal old and new position should return error', async function() {
      sinon.stub(cardsService, 'getter').resolves(cardsOutput as columnModel[] | any);

      try {
        await positionService.updateInside(invalidCardsPositionEqual, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Invalid positions');
      }
    });

    it('successfully', async function() {
      sinon.stub(cardsService, 'getter').resolves(cardsOutput as columnModel[] | any);
      const stubeCreate = sinon.stub(cardsColumnModel, 'update').resolves([1]);

      await positionService.updateInside(validInputCard, tokenVerifyOutput);
      expect(stubeCreate).to.have.been.calledWith({ position: 1 }, { where: { columnId: 1, cardId: 1 } });
    });
  });
})