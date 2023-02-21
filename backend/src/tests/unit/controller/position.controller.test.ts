import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { PositionController } from '../../../controllers';
import cardsModel from '../../../database/models/Cards';
import cardsColumnModel from '../../../database/models/CardsColumn';
import columnModel from '../../../database/models/Column';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { CardsService, ColumnService, MembersService, PositionService } from '../../../services';
import { MembersValidations, PositionValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { cardsOutput, columnsOutput } from '../../mocks/position.mocks';

const { expect } = chai;

const positionValidations = new PositionValidations();
const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const columnService = new ColumnService(membersService);
const cardsService = new CardsService();
const positionService = new PositionService(columnService, cardsService, positionValidations);
const positionController = new PositionController(positionService);

describe('Position controller tests', function() {
  describe('changing column position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });
  });

  it('successfully', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);

    req.body = { user: { ...tokenVerifyOutput }, oldPosition: 0,  newPosition: 1 };
    req.params = { id: '1', database: 'columns' };

    sinon.stub(columnService, 'getter').resolves(columnsOutput as columnModel[] | any);
    sinon.stub(columnWorkspacesModel, 'update').resolves([1]);

    await positionController.updateInside(req, res);
    expect(res.status).to.have.been.calledWith(201);
  });

  describe('changing card position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });
  });

  it('successfully', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);

    req.body = { user: { ...tokenVerifyOutput }, oldPosition: 0,  newPosition: 1 };
    req.params = { id: '1', database: 'cards' };

    sinon.stub(cardsService, 'getter').resolves(cardsOutput as cardsModel[] | any);
    sinon.stub(cardsColumnModel, 'update').resolves([1]);

    await positionController.updateInside(req, res);
    expect(res.status).to.have.been.calledWith(201);
  });
});