import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { RegisterController } from '../../../controllers';
import accountModel from '../../../database/models/Accounts';
import userModel from '../../../database/models/Users';
import { RegisterService } from '../../../services';
import { firstCreateOutput, firstInput, secondCreateOutput } from '../../mocks/register.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const registerController = new RegisterController();
const registerService = new RegisterService();

describe('Register controller tests', function() {
  afterEach(function() {
    sinon.restore();
  });
  
  it('successfully', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(userModel, 'findOne').resolves(undefined);
    sinon.stub(userModel, 'create').resolves(firstCreateOutput as userModel);
    sinon.stub(accountModel, 'create').resolves(secondCreateOutput as accountModel);

    req.body = firstInput;

    await registerController.register(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(secondCreateOutput);
  });
});