import * as chai from 'chai';
import { Transaction } from 'sequelize';
import * as sinon from 'sinon';
import sequelize from '../../../database/models';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import userModel from '../../../database/models/Users';
import workspacesModel from '../../../database/models/Workspaces';
import { IUser, IWorkspace } from '../../../interfaces';
import { MembersService, WorkspacesService } from '../../../services';
import { MembersValidations, WorkspacesValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { getMembersOutput, membersFour, membersThree } from '../../mocks/members.mock';
import {
  createOutput,
  getWorkspacesOutput,
  invalidCreateInput, validCreateInput,
  validNameInput,
  wrongOwnerInput
} from '../../mocks/workspaces.mock';

const { expect } = chai;

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const workspacesValidations = new WorkspacesValidations();
const workspacesService = new WorkspacesService(membersService, workspacesValidations);

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
    });

    it('when a non-existent email is passed, it should return an error', async function() {
      sinon.stub(userModel, 'findOne').resolves(undefined);
      const { name, emails } = invalidCreateInput;
      try {
        await workspacesService.create(name, emails, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('User not found');
      }
    });


    it('successfully create new workspace', async function() {
      sinon.stub(sequelize, 'transaction').resolves(createOutput as unknown as Transaction);
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

      await workspacesService.create(name, emails, tokenVerifyOutput);
    });
  });

  describe('deleting a new workspace', function() {
    afterEach(function() {
      sinon.restore();
    });

    it ('when the user is not a member it should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves([]);

      try {
        await workspacesService.remove(4 , tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it ('when the user is not a administrator it should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(membersThree);

      try {
        await workspacesService.remove(3 , tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });
  });

  describe('Updating workspace name', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when trying to update the name of non-member workspaces it should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(membersFour);
      try {
        await workspacesService.update(4, validNameInput, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('when trying to update name of workspaces and non-admin it should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(membersThree);

      try {
        await workspacesService.update(3, validNameInput, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('successfully', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput);
      const stubUpdate = sinon.stub(workspacesModel, 'update').resolves([1]);
      await workspacesService.update(1, validNameInput, tokenVerifyOutput);
      
      expect(stubUpdate).to.have.been.calledOnceWithExactly({ name: validNameInput }, { where: { id: 1 } })
    });
  })
});