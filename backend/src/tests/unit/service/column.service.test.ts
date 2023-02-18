import * as chai from 'chai';
import * as sinon from 'sinon';
import accountModel from '../../../database/models/Accounts';
import accountWorkspacesModel from '../../../database/models/AccountWorkspaces';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { ColumnService, MembersService } from '../../../services';
import { ColumnValidations, MembersValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { columnsOutput } from '../../mocks/column.mock';
import { getMembersDatavalues, getMembersDatavaluesFour } from '../../mocks/members.mock';
import { accountWorkspaceOutput, accountWorkspaceOutputFour } from '../../mocks/workspaces.mock';

const membersValidations = new MembersValidations();
const memberService = new MembersService(membersValidations);
const columnValidations = new ColumnValidations()
const columnService = new ColumnService(memberService,columnValidations);

const { expect } = chai;


describe('Column service test', function() {
  describe('getting columns from workspace', async function() {
    afterEach(function() {
      sinon.restore();
    });

    it('when the user is not a member, it should return an error', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutputFour as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavaluesFour[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavaluesFour[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavaluesFour[2] as unknown as accountModel);


      try {
        await columnService.getter(4, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });

    it('successfully', async function() {
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutput as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavalues[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavalues[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavalues[2] as unknown as accountModel);


      const result = await columnService.getter(1, tokenVerifyOutput);
      expect(result).to.be.equal(columnsOutput);
    });
  });

  describe('creating columns', function() {
    afterEach(function() {
      sinon.restore();
    });
    
    it('when the user is not a member, it should return an error', async function() {
      sinon.stub(accountWorkspacesModel, 'findAll').resolves(accountWorkspaceOutputFour as unknown as accountWorkspacesModel[]);
      sinon.stub(accountModel, 'findByPk')
        .onFirstCall().resolves(getMembersDatavaluesFour[0] as unknown as accountModel)
        .onSecondCall().resolves(getMembersDatavaluesFour[1] as unknown as accountModel)
        .onThirdCall().resolves(getMembersDatavaluesFour[2] as unknown as accountModel);

      try {
        await columnService.create({ workspaceId: 4, title: 'New column'}, tokenVerifyOutput)
      } catch (err) {
        expect((err as Error).message).to.be.equal('Unauthorized');
      }
    });
  });
});