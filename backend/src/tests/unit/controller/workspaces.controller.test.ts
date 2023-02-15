import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { WorkspacesController } from '../../../controllers';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import userModel from '../../../database/models/Users';
import workspacesModel from '../../../database/models/Workspaces';
import { IUser, IWorkspace } from '../../../interfaces';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { createOutput, getWorkspacesOutput, validCreateInput } from '../../mocks/workspaces.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const workspacesController = new WorkspacesController();

describe('Workspaces controller test', function() {
  describe('getting the list of workspaces', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
  
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(getWorkspacesOutput as IWorkspace[] | any);
  
      req.body = { user: { ...tokenVerifyOutput } };
      
      req.params = { accountId: '1' }
  
      await workspacesController.getAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getWorkspacesOutput);
    });
  })

  describe('creating a new workspace', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
  
      sinon.stub(userModel, 'findOne')
        .onFirstCall().returns({ id: 1 } as IUser | any)
        .onSecondCall().returns({ id: 2 } as IUser | any)
        .onThirdCall().returns({ id: 4 } as IUser | any);
      sinon.stub(workspacesModel, 'create').resolves({ id: 5 } as IWorkspace | any);
      sinon.stub(accountWorkspacesModel, 'create')
        .onFirstCall().returns({ accountId: 1, workspaceId: 5 } as IWorkspace | any)
        .onSecondCall().returns({ accountId: 2, workspaceId: 5 } as IWorkspace | any)
        .onThirdCall().returns({ accountId: 4, workspaceId: 5 } as IWorkspace | any);
  
      req.body = { ...validCreateInput, user: { ...tokenVerifyOutput } };
      
      await workspacesController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createOutput);
    });
  });
});