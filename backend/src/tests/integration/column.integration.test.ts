import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import sequelize from '../../database/models';
import accountModel from '../../database/models/Accounts';
import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import columnModel from '../../database/models/Column';
import columnWorkspacesModel from '../../database/models/ColumnWorkspace';
import { IToken } from '../../interfaces';
import { tokenVerifyOutput, validToken } from '../mocks/account.mock';
import { columnsOutput } from '../mocks/column.mock';
import { getMembersDatavalues, getMembersDatavaluesFour } from '../mocks/members.mock';
import { accountWorkspaceOutput, accountWorkspaceOutputFour } from '../mocks/workspaces.mock';

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

    it('when the user is not a member, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutputFour as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavaluesFour[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavaluesFour[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavaluesFour[2] as unknown as accountModel);

      const { status, body } = await chai.request(app).get('/columns/1').set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavalues[2] as unknown as accountModel);
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[])

      const { status, body } = await chai.request(app).get('/columns/1').set({ authorization: validToken });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(columnsOutput);
    });
  });

  describe('adding columns', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid body should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);

      const { status, body } = await chai.request(app)
        .post('/columns/1').send({ title: 123456 }).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
    });

    it('when the user is not a member, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutputFour as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavaluesFour[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavaluesFour[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavaluesFour[2] as unknown as accountModel);

      const { status, body } = await chai.request(app)
        .post('/columns/1').send({ title: 'New column' }).set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(sequelize, 'transaction').resolves(undefined);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavalues[2] as unknown as accountModel);
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[])

      const { status } = await chai.request(app)
        .post('/columns/1').send({ title: 'New tile' }).set({ authorization: validToken });

      expect(status).to.be.equal(204);
    });
  });

  describe('deleting columns', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when the user is not a member, it should return an error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutputFour as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavaluesFour[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavaluesFour[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavaluesFour[2] as unknown as accountModel);

      const { status, body } = await chai.request(app)
        .delete('/columns/1/4').set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(sequelize, 'transaction').resolves(undefined);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavalues[2] as unknown as accountModel);
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[])

      const { status } = await chai.request(app)
        .delete('/columns/1/1').set({ authorization: validToken });

      expect(status).to.be.equal(204);
    });
  });

  describe('updating column name', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid body should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);

      const { status, body } = await chai.request(app)
        .patch('/columns/1').send({ title: 123456 }).set({ authorization: validToken });

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(columnModel, 'update').resolves([1])
      
      const { status } = await chai.request(app).patch('/columns/1').send({ title: 'New title'}).set({ authorization: validToken});
      
      expect(status).to.be.equal(204);
    });
  });
});
