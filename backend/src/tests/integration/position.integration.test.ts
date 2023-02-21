import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import accountModel from '../../database/models/Accounts';
import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import cardsColumnModel from '../../database/models/CardsColumn';
import columnWorkspacesModel from '../../database/models/ColumnWorkspace';
import { IToken } from '../../interfaces';
import { tokenVerifyOutput, validToken } from '../mocks/account.mock';
import { getMembersDatavalues } from '../mocks/members.mock';
import {
  cardsOutput,
  columnsOutput, createOutput, invalidBody,
  invalidInputs,
  invalidNewPositionBody,
  invalidOldPositionBody,
  newCardsPosition,
  oldCardsPosition,
  validBody
} from '../mocks/position.mocks';
import { accountWorkspaceOutput } from '../mocks/workspaces.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Poistion integration tests', function() {
  describe('changing column position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });

    invalidInputs.forEach(async (input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
        const { body, status } = await chai.request(app).patch('/position/inside/columns/1').send(input).set({ authorization: validToken });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
      });
    })

    it('with invalid database should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/inside/invalid/1').send({ oldPosition: 1, newPosition: 0 }).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid database' });
    });

    it('with invalid new position should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/inside/columns/1').send({ oldPosition: 10, newPosition: 0 }).set({ authorization: validToken });
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid positions' });
    });

    it('with equal old and new position should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/inside/columns/1').send({ oldPosition: 1, newPosition: 1 }).set({ authorization: validToken });
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid positions' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(columnWorkspacesModel, 'update').resolves([1]);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);

      const { status } = await chai.request(app)
        .patch('/position/inside/columns/1').send({ oldPosition: 1, newPosition: 0 }).set({ authorization: validToken });
      
      expect(status).to.be.equal(204);
    });
  });

  describe('changing cards position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });

    invalidInputs.forEach(async (input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
        const { body, status } = await chai.request(app).patch('/position/inside/cards/1').send(input).set({ authorization: validToken });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
      });
    })

    it('with invalid new position should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/inside/cards/1').send({ oldPosition: 10, newPosition: 0 }).set({ authorization: validToken });
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid positions' });
    });

    it('with equal old and new position should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/inside/cards/1').send({ oldPosition: 1, newPosition: 1 }).set({ authorization: validToken });
      
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid positions' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'update').resolves([1]);
      sinon.stub(cardsColumnModel, 'findAll').resolves(cardsOutput as unknown as cardsColumnModel[]);

      const { status } = await chai.request(app)
        .patch('/position/inside/cards/1').send({ oldPosition: 1, newPosition: 0 }).set({ authorization: validToken });
      
      expect(status).to.be.equal(204);
    });
  });

  describe('changing cards position - inside', function() {
    afterEach(function() {
      sinon.restore();
    });

    invalidBody.forEach(async (input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
        const { body, status } = await chai.request(app)
          .patch('/position/outside/1').send(input).set({ authorization: validToken });

        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
      });
    })

    it('with invalid cardId should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll')
        .onFirstCall().resolves(newCardsPosition as unknown as cardsColumnModel[])
        .onSecondCall().resolves(oldCardsPosition as unknown as cardsColumnModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/outside/999').send(validBody).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid cardId' });
    });

    it('with invalid oldPosition should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll')
        .onFirstCall().resolves(newCardsPosition as unknown as cardsColumnModel[])
        .onSecondCall().resolves(oldCardsPosition as unknown as cardsColumnModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/outside/1').send(invalidOldPositionBody).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid oldPosition' });
    });

    it('with invalid newPosition should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'findAll')
        .onFirstCall().resolves(newCardsPosition as unknown as cardsColumnModel[])
        .onSecondCall().resolves(oldCardsPosition as unknown as cardsColumnModel[]);

      const { body, status } = await chai.request(app)
        .patch('/position/outside/1').send(invalidNewPositionBody).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Invalid newPosition' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(cardsColumnModel, 'destroy').resolves(1);
      sinon.stub(cardsColumnModel, 'update').resolves([1]);
      sinon.stub(cardsColumnModel, 'create').resolves(createOutput as unknown as cardsColumnModel);
      sinon.stub(cardsColumnModel, 'findAll')
        .onFirstCall().resolves(newCardsPosition as unknown as cardsColumnModel[])
        .onSecondCall().resolves(oldCardsPosition as unknown as cardsColumnModel[]);

      const { status } = await chai.request(app)
        .patch('/position/outside/1').send(validBody).set({ authorization: validToken });
      
      expect(status).to.be.equal(204);
    });
  });
});