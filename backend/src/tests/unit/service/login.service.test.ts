import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import userModel from '../../../database/models/Users';
import { LoginService } from '../../../services';
import { UserValidations } from '../../../services/validations';
import HandleToken from '../../../utils/HandleToken';
import {
  invalidEmailInput,
  invalidPassowrdlInput, loginOutput, token,
  user,
  validLoginInput
} from '../../mocks/login.mock';

const userValidations = new UserValidations();
const handleToken = new HandleToken();
const loginService = new LoginService(handleToken, userValidations);
const { expect } = chai;

describe('Login service tests', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('with invalid email should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(undefined);

    try {
      await loginService.getter(invalidEmailInput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('Incorrect email or password')
    }
  });

  it('with invalid password should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as unknown as userModel);
    sinon.stub(bcrypt, 'compareSync').resolves(false);
    try {
      await loginService.getter(invalidPassowrdlInput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('Incorrect email or password')
    }
  });

  it('successfully', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as unknown as userModel);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(jwt, 'sign').returns(token as any);

    const result = await loginService.getter(validLoginInput);
    expect(result).to.be.deep.equal(loginOutput);
  });
});