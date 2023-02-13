import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import userModel from '../../../database/models/Users';
import { LoginService } from '../../../services';
import { HandleToken } from '../../../utils';
import {
  invalidEmailInput,
  invalidPassowrdlInput,
  token,
  user,
  validLoginInput
} from '../../mocks/login.mock';

const loginService = new LoginService();
const handleToken = new HandleToken();
const { expect } = chai;

describe('Login service tests', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('with invalid email should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(undefined);

    try {
      await loginService.login(invalidEmailInput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('Incorrect email or password')
    }
  });

  it('with invalid password should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as unknown as userModel);
    sinon.stub(bcrypt, 'compareSync').resolves(false);
    try {
      await loginService.login(invalidPassowrdlInput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('Incorrect email or password')
    }
  });

  it('successfully', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as unknown as userModel);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(jwt, 'sign').resolves(token);

    const result = await loginService.login(validLoginInput);
    expect(result).to.be.equal(token);
  });
});