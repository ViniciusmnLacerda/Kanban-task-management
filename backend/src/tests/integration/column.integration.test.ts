import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import columnWorkspacesModel from '../../database/models/ColumnWorkspace';
import { IToken } from '../../interfaces';
import { tokenVerifyOutput, validToken } from '../mocks/account.mock';
import { columnsOutput } from '../mocks/column.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Column integration tests', function() {
  describe('getting columns from workspace', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[])

      const { status, body } = await chai.request(app).get('/columns/1').set({ authorization: validToken });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(columnsOutput);
    });
  });
});