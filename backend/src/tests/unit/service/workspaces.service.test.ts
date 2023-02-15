import * as chai from 'chai';
import * as sinon from 'sinon';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import { IWorkspace } from '../../../interfaces';
import { WorkspacesService } from '../../../services';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { getWorkspacesOutput } from '../../mocks/workspaces.mock';


const { expect } = chai;

const workspacesService = new WorkspacesService();

describe('Workspaces service test', function() {
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