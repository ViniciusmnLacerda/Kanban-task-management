import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import accountWorkspacesModel from '../../database/models/AccountWorkspaces';
import { IToken } from '../../interfaces';
import { MembersService } from '../../services';
import { tokenVerifyOutput, validToken } from '../mocks/account.mock';
import { getMembersOutput } from '../mocks/members.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const membersService = new MembersService();

const { app } = new App();
const { expect } = chai; 

describe('Members integration tests', function() {
  describe('getting workspace members', function() {
    afterEach(function() {
      sinon.restore();
    });


    it('with invalid id should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves([]);

      const { body, status  } = await chai.request(app).get('/members/9999').set({ authorization: validToken });

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Workspace not found' });
    });
  });

  describe('changing admin permissions', function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when a user tries to change his own permissions it should return error', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);

      const { body, status  } = await chai.request(app).patch('/members/1/1').set({ authorization: validToken });

      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Unauthorized' });
    });

    it('when a user tries to change the permissions of a non-member user', async function() {
      sinon.stub(jwt, 'verify').returns(tokenVerifyOutput as IToken | any);
      sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);

      const { body, status  } = await chai.request(app).patch('/members/1/9999').set({ authorization: validToken });

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'User not found' });
    });
  });
});