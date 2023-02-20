import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { CardsController } from '../../../controllers';
import sequelize from '../../../database/models';
import cardsColumnModel from '../../../database/models/CardsColumn';
import { CardsService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { cardsOutput, validCreateInput } from '../../mocks/cards.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const cardsService = new CardsService();
const cardsController  = new CardsController(cardsService);

const { expect } = chai;

describe('Cards controller tests', function() {
  describe('getting cards from column', function () {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);
  
      req.params = { columndId: '1' };
      req.body = { user: { ...tokenVerifyOutput } };
      
      await cardsController.getter(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(cardsOutput);
    });
  })

  describe('creating cards', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);
      sinon.stub(sequelize, 'transaction').resolves(undefined);

      req.params = { columndId: '1' };
      req.body = { user: { ...tokenVerifyOutput }, ...validCreateInput };

      await cardsController.create(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('deleting cards', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);
      sinon.stub(sequelize, 'transaction').resolves(undefined);

      req.params = { cardId: '1', columnId: '1' };
      req.body = { user: { ...tokenVerifyOutput } };

      await cardsController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });
});
