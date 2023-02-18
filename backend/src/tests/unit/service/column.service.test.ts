import * as chai from 'chai';
import * as sinon from 'sinon';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { ColumnService } from '../../../services';
import { ColumnValidations } from '../../../services/validations';
import { tokenVerifyOutput } from '../../mocks/account.mock';
import { columnsOutput } from '../../mocks/column.mock';

const columnValidations = new ColumnValidations()
const columnService = new ColumnService(columnValidations);

const { expect } = chai;


describe('Column service test', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('getting columns from workspace', async function() {
    it('successfully', async function() {
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);
  
      const result = await columnService.getter(1, tokenVerifyOutput)
      expect(result).to.be.equal(columnsOutput);
    });
  });
});