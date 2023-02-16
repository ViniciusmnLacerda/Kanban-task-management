import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { Transaction } from 'sequelize';
import * as sinon from 'sinon';
import App from '../../app';
import sequelize from '../../database/models';
import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import userModel from '../../database/models/Users';
import workspacesModel from '../../database/models/Workspaces';
import { IToken, IUser, IWorkspace } from '../../interfaces';
import { invalidToken, tokenVerifyOutput, validToken } from '../mocks/account.mock';
import {
  createOutput, getWorkspacesOutput,
  invalidCreateInput,
  invalidInputs,
  validCreateInput,
  wrongOwnerInput
} from '../mocks/workspaces.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Workspaces integration tests', function() {
  describe('getting the list of workspaces', function() {
    afterEach(function() {
      sinon.restore()
    });
  
    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).get('/workspaces/1');
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });
  
    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).get('/workspaces/1').set({ authorization: invalidToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });
  
    it('when the client requests an account that is not the owner, it should return an error', async function() {
      sinon.stub(jwt, 'verify').resolves(tokenVerifyOutput)
      const { body, status } = await chai.request(app).get('/workspaces/2').set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });
  
    it('successfully should return workspaces', async function() {
      tokenVerifyOutput.userId = 1;
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(getWorkspacesOutput as IWorkspace[] | any);
      const { body, status } = await chai.request(app).get('/workspaces/1').set({ authorization: validToken });
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(getWorkspacesOutput);
    });
  });

  describe('creating a new workspace', function () {
    afterEach(function() {
      sinon.restore()
    });

    it('without the token in the request it should return error', async function() {
      const { body, status } = await chai.request(app).post('/workspaces').send(validCreateInput);
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Token not found' });
    });

    it('with invalid token should return error', async function() {
      const { body, status } = await chai.request(app).post('/workspaces').set({ authorization: invalidToken }).send(validCreateInput);
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid token' });
    });

    invalidInputs.forEach(async (input, index) => {
      it(`${index + 1} - with invalid body it should return error`, async function() {
        sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
        const { body, status  } = await chai.request(app).post('/workspaces').send(input).set({ authorization: validToken });
        expect(status).to.be.equal(400);
        expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
      });
    })

    it('when the user is not the first in the mailing list, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      const { body, status  } = await chai.request(app).post('/workspaces').send(wrongOwnerInput).set({ authorization: validToken });
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    })

    it('when a non-existent email is passed, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(userModel, 'findOne')
        .onFirstCall().returns({ id: 1 } as IUser | any)
        .onSecondCall().resolves(undefined);

      const { body, status  } = await chai.request(app).post('/workspaces').send(invalidCreateInput).set({ authorization: validToken });

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'User not found' });
    });

    it('successfully create new workspace', async function() {
      sinon.stub(sequelize, 'transaction').resolves(createOutput as unknown as Transaction)
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(userModel, 'findOne')
        .onFirstCall().returns({ id: 1 } as IUser | any)
        .onSecondCall().returns({ id: 2 } as IUser | any)
        .onThirdCall().returns({ id: 4 } as IUser | any);
      sinon.stub(workspacesModel, 'create').resolves({ id: 5 } as IWorkspace | any);
      sinon.stub(accountWorkspacesModel, 'create')
        .onFirstCall().returns({ accountId: 1, workspaceId: 5, admin: true } as IWorkspace | any)
        .onSecondCall().returns({ accountId: 2, workspaceId: 5, admin: false } as IWorkspace | any)
        .onThirdCall().returns({ accountId: 4, workspaceId: 5, admin: false } as IWorkspace | any);

      const { body, status  } = await chai.request(app).post('/workspaces').send(invalidCreateInput).set({ authorization: validToken });
      
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(createOutput);
    });
  })
});
