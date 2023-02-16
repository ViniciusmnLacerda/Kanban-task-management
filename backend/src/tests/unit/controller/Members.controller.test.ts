// import * as chai from 'chai';
// import { Request, Response } from 'express';
// import * as sinon from 'sinon';
// import { MembersController } from '../../../controllers';
// import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
// import { MembersService } from '../../../services';
// import { MembersValidations } from '../../../services/validations';
// import { tokenVerifyOutput } from '../../mocks/account.mock';
// import { getMembersOutput, member } from '../../mocks/members.mock';

// // @ts-ignore
// import sinonChai = require('sinon-chai');

// chai.use(sinonChai);

// const membersService = new MembersService()
// const membersController = new MembersController()
// const membersValidations = new MembersValidations();

// const { expect } = chai;


// describe('Members controller tests', function() {
//   describe('changing admin permissions', function() {
//     afterEach(function() {
//       sinon.restore();
//     });
    
//     it('successfully', async function() {
//       const req = {} as Request;
//       const res = {} as Response;
  
//       res.sendStatus = sinon.stub().returns(res);
//       res.json = sinon.stub().returns(res);
      
//       req.body = { user: { ...tokenVerifyOutput } };
//       req.params = { workspaceId: '1', accountId: '2' };

//       sinon.stub(membersService, 'getMembers').resolves(getMembersOutput);
//       sinon.stub(membersValidations, 'validateUsers').resolves(member);
//       sinon.stub(accountWorkspacesModel, 'update').resolves(undefined);

//       await membersController.toggleAdmin(req, res);
  
//       expect(res.status).to.have.been.calledWith(204);
//     });
//   });
// });
