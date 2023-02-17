import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import accountModel from '../../../database/models/Accounts';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import usersModel from '../../../database/models/Users';
import { IAccountWorkspace, IToken } from '../../../interfaces';
import { MembersService } from '../../../services';
import { MembersValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import {
  createOutput,
  emailInUseOutput, getMembersDatavalues, getMembersOutput,
  invalidNewMemberInput, membersFour, membersThree,
  notMember, userHimself, userModelOutput, validNewMemberInput,
  validNewMemberInputThree
} from '../../mocks/members.mock';
import { accountWorkspaceOutput } from '../../mocks/workspaces.mock';

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
        await membersService.getAll(9999, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Workspace not found');
      }
    });

    it('when the user requests a list of a workspace that he is not a member of', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(notMember as IAccountWorkspace | any);
      try {
        await membersService.getAll(4, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);


      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as IAccountWorkspace | any);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavalues[2] as unknown as accountModel);

      const members = await membersService.getAll(1, tokenVerifyOutput);

      expect(members).to.be.deep.equal(getMembersOutput);
    });
  })

  describe('changing admin permissions', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when a user tries to change his own permissions it should return error', async function() {
      try {
        await membersService.update(1, 1, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('when a user tries to change the permissions of a non-member user', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput);

      try {
        await membersService.update(1, 9999, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('User not found');
      }
    });

    it('successfully', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput);
      const stubUpdate = sinon.stub(accountWorkspacesModel, 'update').resolves([1]);

      await membersService.update(1, 2, tokenVerifyOutput);

      expect(stubUpdate).to.have.been.calledOnceWithExactly({ admin: true }, { where: { workspaceId: 1, accountId: 2 } });
    });
  })

  describe('adding new member', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('adding user that does not exist should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(undefined);

      try {
        await membersService.create(1, invalidNewMemberInput, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('User not found');
      }
    });

    it('add user who is member should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(emailInUseOutput as unknown as usersModel);

      try {
        await membersService.create(1, invalidNewMemberInput, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('The user is already a member');
      }
    });

    it('when the user is not admin it should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(membersThree); 
      sinon.stub(usersModel, 'findOne').resolves(emailInUseOutput as unknown as usersModel);

      try {
        await membersService.create(3, validNewMemberInputThree, tokenVerifyOutput);
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('successfully', async function() {
      sinon.stub(membersService, 'getAll').resolves(membersFour); 
      sinon.stub(membersValidations, 'insertValidations').resolves(4);
      const createStub = sinon.stub(accountWorkspacesModel, 'create').resolves(createOutput as unknown as accountWorkspacesModel);

      await membersService.create(1, validNewMemberInput, tokenVerifyOutput);

      expect(createStub).to.have.been.calledOnceWithExactly(createOutput);

    });
  })

  describe('removing a member', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when the user is not a member it should return error', async function() {
      sinon.stub(membersService, 'getAll').resolves(membersFour); 

      try {
        await membersService.remove(4, tokenVerifyOutput, 'marianne@email.com');
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('when the email sent does not exist in the database', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(undefined);

      try {
        await membersService.remove(4, tokenVerifyOutput, 'invalid@email.com');
      } catch (err) {
        expect((err as Error).message).to.be.equal('User not found');
      }
    });

    it('when the user to be removed is not a member', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(userModelOutput as unknown as usersModel);

      try {
        await membersService.remove(1, tokenVerifyOutput, 'igor@email.com');
      } catch (err) {
        expect((err as Error).message).to.be.equal('User is not member');
      }
    });

    it('when the user wants to remove himself', async function() {
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(userHimself as unknown as usersModel);
      const stubDestroy = sinon.stub(accountWorkspacesModel, 'destroy').resolves(1);

      await membersService.remove(1, tokenVerifyOutput, 'vinicius@email.com');

      expect(stubDestroy).to.have.been.calledOnceWithExactly({ where: { workspaceId: 1, accountId: 1 }});

    });

    it('when the user is not admin it should return error', async function() {
      getMembersOutput[0].admin = false;
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(emailInUseOutput as unknown as usersModel);

      try {
        await membersService.remove(1, tokenVerifyOutput, 'marianne@email.com');
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('successfully', async function() {
      getMembersOutput[0].admin = true;
      sinon.stub(membersService, 'getAll').resolves(getMembersOutput); 
      sinon.stub(usersModel, 'findOne').resolves(emailInUseOutput as unknown as usersModel);
      const stubDestroy = sinon.stub(accountWorkspacesModel, 'destroy').resolves(1);

      await membersService.remove(1, tokenVerifyOutput, 'marianne@email.com');

      expect(stubDestroy).to.have.been.calledOnceWithExactly({ where: { workspaceId: 1, accountId: 2 }});
    });
  });
})