import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { AccountController } from '../../../controllers';
import accountModel from '../../../database/models/Accounts';
import { accountOutput, tokenVerifyOutput } from '../../mocks/account.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const accountController = new AccountController();


describe('Account controller test', function() {
  afterEach(function() {
    sinon.restore();
  });
  
  it('successfully', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(accountModel ,'findByPk').resolves(accountOutput as unknown as accountModel);

    req.body = tokenVerifyOutput;
    req.params = { id: '1' }

    await accountController.getAccount(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(accountOutput);
  });
});