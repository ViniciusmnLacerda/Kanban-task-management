import * as chai from 'chai';
import * as sinon from 'sinon';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import { IAccountWorkspace } from '../../../interfaces';
import { MembersService } from '../../../services';
import { MembersValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { getMembersOutput, notMember } from '../../mocks/members.mock';

const { expect } = chai;

const membersValidations = new MembersValidations()
const membersService = new MembersService(membersValidations);

describe('Members service test', function() {
  describe('getting workspace members', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid id should return error', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves([]);
      try {
        await membersService.getMembers(9999, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Workspace not found');
      }
    });

    it('when the user requests a list of a workspace that he is not a member of', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(notMember as IAccountWorkspace | any);
      try {
        await membersService.getMembers(4, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('User is not a member');
      }
    });
  })

  describe('changing admin permissions', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when a user tries to change his own permissions it should return error', async function() {
      try {
        await membersService.toggleAdmin(1, 1, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('when a user tries to change the permissions of a non-member user', async function() {
      sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);

      try {
        await membersService.toggleAdmin(1, 9999, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('User not found');
      }
    });
  })
})