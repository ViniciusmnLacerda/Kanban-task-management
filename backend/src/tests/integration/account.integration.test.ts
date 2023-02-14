import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import accountModel from '../../database/models/Accounts';
import { IToken } from '../../interfaces';
import { accountOutput, invalidToken, tokenVerifyOutput, validToken } from '../mocks/account.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Account integration tests', function() {
  afterEach(function() {
    sinon.restore()
  });

  it('without the token in the request it should return error', async function() {
    const { body, status } = await chai.request(app).get('/account/1');
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('with invalid token should return error', async function() {
    const { body, status } = await chai.request(app).get('/account/1').set({ authorization: invalidToken });
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid token' });
  });

  it('when the client requests an account that is not the owner, it should return an error', async function() {
    sinon.stub(jwt, 'verify').resolves(tokenVerifyOutput)
    const { body, status } = await chai.request(app).get('/account/2').set({ authorization: validToken });
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Unauthorized' });
  });

  it('with invalid id should return error', async function() {
    tokenVerifyOutput.userId = 999;
    sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
    sinon.stub(accountModel, 'findByPk').resolves(undefined);
    const { body, status } = await chai.request(app).get('/account/999').set({ authorization: validToken });
    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'Account not found' });
  });

  it('successfully should return account', async function() {
    tokenVerifyOutput.userId = 1;
    sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
    sinon.stub(accountModel, 'findByPk').resolves(accountOutput as unknown as accountModel);
    const { body, status } = await chai.request(app).get('/account/1').set({ authorization: validToken });
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(accountOutput);
  });
});
