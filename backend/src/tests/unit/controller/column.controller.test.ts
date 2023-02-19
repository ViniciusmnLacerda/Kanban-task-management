import * as chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { ColumnController } from '../../../controllers';
import sequelize from '../../../database/models';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { ColumnService, MembersService } from '../../../services';
import { MembersValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { columnsOutput } from '../../mocks/column.mock';
import { getMembersOutput } from '../../mocks/members.mock';

// @ts-ignore
import sinonChai = require('sinon-chai');

chai.use(sinonChai);

const membersValidations = new MembersValidations();
const memberService = new MembersService(membersValidations);
const columnService = new ColumnService(memberService);
const columnController = new ColumnController(columnService);

const { expect } = chai;

describe('Column controller tests', function() {
  describe('getting columns from workspace', function () {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);
      sinon.stub(memberService, 'getter').resolves(getMembersOutput);
  
      req.params = { workspaceId: '1' };
      req.body = { user: { ...tokenVerifyOutput } };
      
      await columnController.getter(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(columnsOutput);
    });
  })

  describe('creating columns', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);

      sinon.stub(memberService, 'getter').resolves(getMembersOutput);
      sinon.stub(sequelize, 'transaction').resolves(undefined);
  
      req.params = { workspaceId: '1' };
      req.body = { user: { ...tokenVerifyOutput }, title: 'New column' };
      
      await columnController.create(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('deleting columns', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      const req = {} as Request;
      const res = {} as Response;
  
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res);

      sinon.stub(memberService, 'getter').resolves(getMembersOutput);
      sinon.stub(sequelize, 'transaction').resolves(undefined);
  
      req.params = { columnId: '1' , workspaceId: '1' };
      req.body = { user: { ...tokenVerifyOutput } };
      
      await columnController.remove(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
    });
  });
});
