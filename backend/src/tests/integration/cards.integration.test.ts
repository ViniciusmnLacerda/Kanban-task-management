import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import sequelize from '../../database/models';
import cardsColumnModel from '../../database/models/CardsColumn';
import { IToken } from '../../interfaces';
import { tokenVerifyOutput, validToken } from '../mocks/account.mock';
import { cardsOutput, invalidInputs } from '../mocks/cards.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Column integration tests', function() {
  describe('getting columns from workspace', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);
      const { status, body } = await chai.request(app).get('/cards/1').set({ authorization: validToken });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(cardsOutput);
    });
  });

  describe('creating cards', function() {
    afterEach(function() {
      sinon.restore();
    });

    invalidInputs.forEach(async (input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
        const { body, status } = await chai.request(app).post('/cards/1').send(input).set({ authorization: validToken });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
      });
    })

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);
      sinon.stub(sequelize, 'transaction').resolves(undefined);
      const { status } = await chai.request(app)
        .post('/cards/1').send({ title: 'New title', content: 'New content'}).set({ authorization: validToken });

      expect(status).to.be.equal(204);
    });
  });
});
