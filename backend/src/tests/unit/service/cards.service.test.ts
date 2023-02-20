import * as chai from 'chai';
import * as sinon from 'sinon';
import cardsColumnModel from '../../../database/models/CardsCorlumn';
import { CardsService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { cardsOutput } from '../../mocks/cards.mock';

const cardsService = new CardsService();

const { expect } = chai;


describe('Cards service test', function() {
  describe('getting cards from workspace', async function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);
      const result = await cardsService.getter(1, tokenVerifyOutput);
      expect(result).to.be.equal(cardsOutput);
    });
  });
});