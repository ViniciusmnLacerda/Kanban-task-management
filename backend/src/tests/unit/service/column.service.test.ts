import * as chai from 'chai';
import * as sinon from 'sinon';
import columnWorkspacesModel from '../../../database/models/ColumnWorkspace';
import { ColumnService } from '../../../services';
import { ColumnValidations } from '../../../services/validations';
import { columnsOutput } from '../../mocks/column.mock';

const columnValidations = new ColumnValidations()
const columnService = new ColumnService(columnValidations);

const { expect } = chai;


describe('Column service test', function() {
  describe('getting columns from workspace', async function() {
    afterEach(function() {
      sinon.restore();
    });

    it('successfully', async function() {
      sinon.stub(columnWorkspacesModel, 'findAll').resolves(columnsOutput as unknown as columnWorkspacesModel[]);
  
      const result = await columnService.getter(1);
      expect(result).to.be.equal(columnsOutput);
    });
  });
});