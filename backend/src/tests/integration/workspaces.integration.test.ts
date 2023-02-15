import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import { IToken, IWorkspace } from '../../interfaces';
import { invalidToken, tokenVerifyOutput, validToken } from '../mocks/account.mock';
import { getWorkspacesOutput } from '../mocks/workspaces.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Workspaces integration tests', function() {
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

  it('successfully should return account', async function() {
    tokenVerifyOutput.userId = 1;
    sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
    sinon.stub(accountWorkspacesModel, 'findAll').resolves(getWorkspacesOutput as IWorkspace[] | any);
    const { body, status } = await chai.request(app).get('/workspaces/1').set({ authorization: validToken });
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getWorkspacesOutput);
  });
});
