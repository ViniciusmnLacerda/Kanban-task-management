import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { WorkspacesController } from '../../../controllers';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import { IWorkspace } from '../../../interfaces';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { getWorkspacesOutput } from '../../mocks/workspaces.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const workspacesController = new WorkspacesController();

describe('Workspaces controller test', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('successfully', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(accountWorkspacesModel, 'findAll').resolves(getWorkspacesOutput as IWorkspace[] | any);

    req.body = tokenVerifyOutput;
    req.params = { accountId: '1' }

    await workspacesController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getWorkspacesOutput);
  });
});