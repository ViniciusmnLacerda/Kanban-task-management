import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { MembersController } from '../../../controllers';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import { MembersService } from '../../../services';
import { MembersValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { getMembersOutput, member, validNewMemberInput } from '../../mocks/members.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const membersValidations = new MembersValidations();
const membersService = new MembersService(membersValidations);
const membersController = new MembersController(membersService);

const { expect } = chai;


describe('Members controller tests', function() {
  describe('getting workspace members', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      
      req.body = { user: { ...tokenVerifyOutput } };
      req.params = { workspaceId: '1' };

      sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);

      await membersController.getMembers(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getMembersOutput);
    });
  });

  describe('changing admin permissions', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);
      
      req.body = { user: { ...tokenVerifyOutput } };
      req.params = { workspaceId: '1', accountId: '2' };

      sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);
      sinon.stub(membersValidations, 'validateUsers').resolves(member);
      sinon.stub(accountWorkspacesModel, 'update').resolves(undefined);

      await membersController.toggleAdmin(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('adding new member', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);

      sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);
      sinon.stub(membersValidations, 'insertValidations').resolves(4);
      sinon.stub(accountWorkspacesModel, 'create').resolves(undefined);


      req.body = { user: { ...tokenVerifyOutput }, ...validNewMemberInput };
      req.params = { workspaceId: '1' };

      await membersController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('removing a member', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);

      sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);
      sinon.stub(membersValidations, 'removeValidations').resolves(3);
      sinon.stub(accountWorkspacesModel, 'destroy').resolves(1);


      req.body = { user: { ...tokenVerifyOutput }, email: 'marianne@email.com' };
      req.params = { workspaceId: '1' };

      await membersController.remove(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
    });
  });
});
