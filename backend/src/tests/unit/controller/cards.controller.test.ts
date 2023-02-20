import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { CardsController } from '../../../controllers';
import cardsColumnModel from '../../../database/models/CardsCorlumn';
import { CardsService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { cardsOutput } from '../../mocks/cards.mock';

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
});
