import * as chai from 'chai';
import * as sinon from 'sinon';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import { MembersService } from '../../../services';

const { expect } = chai;

const membersService = new MembersService();

describe('Members service test', function() {
  describe('getting workspace members', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid id should return error', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves([]);
      try {
        await membersService.getMembers(9999)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Workspace not found');
      }
    });
  })
})