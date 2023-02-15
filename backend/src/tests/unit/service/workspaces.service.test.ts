import * as chai from 'chai';
import * as sinon from 'sinon';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import userModel from '../../../database/models/Users';
import workspacesModel from '../../../database/models/Workspaces';
import { IUser, IWorkspace } from '../../../interfaces';
import { WorkspacesService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { createOutput, getWorkspacesOutput, invalidCreateInput } from '../../mocks/workspaces.mock';

const { expect } = chai;

const workspacesService = new WorkspacesService();

describe('Workspaces service test', function() {
  describe('getting the list of workspaces', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('when the client requests workspaces that is not the owner, it should return an error', async function() {
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

    it('when a non-existent email is passed, it should return an error', async function() {
      sinon.stub(userModel, 'findOne').resolves(undefined);
      const { name, emails } = invalidCreateInput;
      try {
        await workspacesService.create(name, emails);
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
        .onFirstCall().returns({ accountId: 1, workspaceId: 5, owner: true } as IWorkspace | any)
        .onSecondCall().returns({ accountId: 2, workspaceId: 5, owner: false } as IWorkspace | any)
        .onThirdCall().returns({ accountId: 4, workspaceId: 5, owner: false } as IWorkspace | any);

      const { name, emails } = invalidCreateInput;

      const result = await workspacesService.create(name, emails);

      expect(result).to.be.deep.equal(createOutput);
    });
  });
});