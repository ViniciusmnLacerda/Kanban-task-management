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
        await workspacesService.getter(2, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });
  
    it('successfully', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(getWorkspacesOutput as unknown as accountWorkspacesModel[]);
  
      const result = await workspacesService.getter(1, tokenVerifyOutput);
      expect(result).to.be.deep.equal(getWorkspacesOutput);
    });
  });

  describe('creating a new workspace', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('when the user is not the first in the mailing list, it should return an error', async function() {
      sinon.stub(userModel, 'findOne').resolves(undefined);
      try {
        await workspacesService.create(wrongOwnerInput, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('when a non-existent email is passed, it should return an error', async function() {
      sinon.stub(userModel, 'findOne').resolves(undefined);
      try {
        await workspacesService.create(invalidCreateInput, tokenVerifyOutput);
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

      await workspacesService.create(validCreateInput, tokenVerifyOutput);
    });
  });

  describe('deleting a new workspace', function() {
    afterEach(function() {
      sinon.restore();
    });

    it ('when the user is not a member it should return error', async function() {
      sinon.stub(membersService, 'getter').resolves([]);

      try {
        await workspacesService.remove({ id: 4 }, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it ('when the user is not a administrator it should return error', async function() {
      sinon.stub(membersService, 'getter').resolves(membersThree);

      try {
        await workspacesService.remove({ id: 3} , tokenVerifyOutput);
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
      sinon.stub(membersService, 'getter').resolves(membersFour);
      try {
        await workspacesService.update({ id: 4, title: 'New title' }, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('when trying to update name of workspaces and non-admin it should return error', async function() {
      sinon.stub(membersService, 'getter').resolves(membersThree);

      try {
        await workspacesService.update({ id: 3, title: 'New title' }, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('successfully', async function() {
      sinon.stub(membersService, 'getter').resolves(getMembersOutput);
      const stubUpdate = sinon.stub(workspacesModel, 'update').resolves([1]);
      await workspacesService.update({ id: 1, title: 'New title' }, tokenVerifyOutput);
      
      expect(stubUpdate).to.have.been.calledOnceWithExactly({ title: 'New title' }, { where: { id: 1 } })
    });
  })
});