import * as chai from 'chai';
import * as sinon from 'sinon';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import userModel from '../../../database/models/Users';
import workspacesModel from '../../../database/models/Workspaces';
import { IUser, IWorkspace } from '../../../interfaces';
import { WorkspacesService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import {
  createOutput,
  getWorkspacesOutput,
  invalidCreateInput, validCreateInput,
  wrongOwnerInput
} from '../../mocks/workspaces.mock';

const { expect } = chai;

const workspacesService = new WorkspacesService();

describe('Workspaces service test', function() {
  describe('getting the list of workspaces', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('when the client requests workspaces it is not a member of, it should return an error', async function() {
      try {
        await workspacesService.getAll(2, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });
  
    it('successfully', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(getWorkspacesOutput as IWorkspace[] | any);
  
      const result = await workspacesService.getAll(1, tokenVerifyOutput);
      expect(result).to.be.deep.equal(getWorkspacesOutput);
    });
  });

  describe('creating a new workspace', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('when the user is not the first in the mailing list, it should return an error', async function() {
      sinon.stub(userModel, 'findOne').resolves(undefined);
      const { name, emails } = wrongOwnerInput;
      try {
        await workspacesService.create(name, emails, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    })

    it('when a non-existent email is passed, it should return an error', async function() {
      sinon.stub(userModel, 'findOne').resolves(undefined);
      const { name, emails } = invalidCreateInput;
      try {
        await workspacesService.create(name, emails, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('User not found');
      }
    })


    it('successfully create new workspace', async function() {
      sinon.stub(userModel, 'findOne')
        .onFirstCall().returns({ id: 1 } as IUser | any)
        .onSecondCall().returns({ id: 2 } as IUser | any)
        .onThirdCall().returns({ id: 4 } as IUser | any);
      sinon.stub(workspacesModel, 'create').resolves({ id: 5 } as IWorkspace | any);
      sinon.stub(accountWorkspacesModel, 'create')
        .onFirstCall().returns({ accountId: 1, workspaceId: 5, admin: true } as IWorkspace | any)
        .onSecondCall().returns({ accountId: 2, workspaceId: 5, admin: false } as IWorkspace | any)
        .onThirdCall().returns({ accountId: 4, workspaceId: 5, admin: false } as IWorkspace | any);

      const { name, emails } = validCreateInput;

      const result = await workspacesService.create(name, emails, tokenVerifyOutput);

      expect(result).to.be.deep.equal(createOutput);
    });
  });

  describe('getting workspace members', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('with invalid id should return error', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves([]);
      try {
        await workspacesService.getMembers(9999)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Workspace not found');
      }
    });
  });
});