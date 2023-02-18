import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { ColumnController } from '../../../controllers';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { ColumnService } from '../../../services';
import { ColumnValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { columnsOutput } from '../../mocks/column.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const columnValidations = new ColumnValidations();
const columnService = new ColumnService(columnValidations)
const columnController = new ColumnController(columnService);

const { expect } = chai;

describe('Column controller tests', function() {
  describe('', function () {
    afterEach(function() {
      sinon.restore();
    });
  })

  it('getting columns from workspace', async function() {
    const req = {} as Request;
    const res = {} as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);

    req.params = { workspaceId: '1' };
    req.body = { user: { ...tokenVerifyOutput } };
    
    await columnController.getter(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(columnsOutput);
  });
});
