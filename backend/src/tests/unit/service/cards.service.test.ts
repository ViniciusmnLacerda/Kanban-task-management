import * as chai from 'chai';
import * as sinon from 'sinon';
import sequelize from '../../../database/models';
import cardsColumnModel from '../../../database/models/CardsColumn';
import { CardsService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { cardsOutput, validCreateInput } from '../../mocks/cards.mock';

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

  describe('creating cards', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('successfully', async function() {
      sinon.stub(sequelize, 'transaction').resolves(undefined);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);

      await cardsService.create(validCreateInput, tokenVerifyOutput);

      console.log('ALERT: how to dub sequelize transaction?');
      
    });
  })

  describe('deleting cards', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('successfully', async function() {
      sinon.stub(sequelize, 'transaction').resolves(undefined);

      await cardsService.remove({ id: 1, key: 1}, tokenVerifyOutput);

      console.log('ALERT: how to dub sequelize transaction?');
      
    });
  })

});