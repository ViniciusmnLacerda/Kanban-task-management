import * as chai from 'chai';
import { Transaction } from 'sequelize';
import * as sinon from 'sinon';
import sequelize from '../../../database/models';
import accountModel from '../../../database/models/Accounts';
import userModel from '../../../database/models/Users';
import { RegisterService } from '../../../services';
import { UserValidations } from '../../../services/validations';
import { user } from '../../mocks/login.mock';
import {
  emailNotAvailableInput,
  firstCreateOutput, firstInput, secondCreateOutput
} from '../../mocks/register.mock';

const userValidations = new UserValidations();
const registerService = new RegisterService(userValidations);
const { expect } = chai;


describe('Register service tests', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('with email in use should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as unknown as userModel);
    try {
      await registerService.setter(emailNotAvailableInput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('E-mail is already in used');
    }
  });

  it('successfully', async function() {
    sinon.stub(sequelize, 'transaction').resolves(secondCreateOutput as unknown as Transaction);
    sinon.stub(userModel, 'findOne').resolves(undefined);
    sinon.stub(userModel, 'create').resolves(firstCreateOutput as userModel);
    sinon.stub(accountModel, 'create').resolves(secondCreateOutput as accountModel);
    
    const result =  await registerService.setter(firstInput);

    expect(result).to.be.deep.equal(secondCreateOutput);
  });
});