import * as chai from 'chai';
import * as sinon from 'sinon';
import accountModel from '../../../database/models/Accounts';
import { AccountService } from '../../../services';
import { accountOutput, tokenVerifyOutput } from '../../mocks/account.mock';

const { expect } = chai;

const accountService = new AccountService();

describe('Account service test', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('when the client requests an account that is not the owner, it should return an error', async function() {
    try {
      await accountService.getter(2, tokenVerifyOutput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('Unauthorized');
    }
  });

  it('with invalid id should return error', async function() {
    sinon.stub(accountModel, 'findOne').resolves(undefined);

    tokenVerifyOutput.userId = 99999;

    try {
      await accountService.getter(99999, tokenVerifyOutput);
    } catch (err) {
      expect((err as Error).message).to.be.equal('Account not found')
    }
  });

  it('successfully', async function() {
    sinon.stub(accountModel, 'findOne').resolves(accountOutput as unknown as accountModel);

    tokenVerifyOutput.userId = 1;

    const result = await accountService.getter(1, tokenVerifyOutput);
    expect(result).to.be.equal(accountOutput);
  });
});