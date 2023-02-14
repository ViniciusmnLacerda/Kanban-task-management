import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { LoginController } from '../../../controllers';
import userModel from '../../../database/models/Users';
import { LoginService } from '../../../services';
import { loginOutput, token, user, validLoginInput } from '../../mocks/login.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const loginController = new LoginController();
const loginService = new LoginService();
const { expect } = chai;

describe('Login controller tests', function() {
  afterEach(function() {
    sinon.restore();
  });
  
  it('successfully should return token', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(userModel, 'findOne').resolves(user as unknown as userModel);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(jwt, 'sign').returns(token as any);

    req.body = validLoginInput;

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(loginOutput);
  });
});
