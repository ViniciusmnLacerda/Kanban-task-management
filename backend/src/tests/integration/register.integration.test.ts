import * as chai from 'chai';
import * as sinon from 'sinon';
import App from '../../app';
import accountModel from '../../database/models/Accounts';
import userModel from '../../database/models/Users';
import { user } from '../mocks/login.mock';
import {
  emailNotAvailableInput, firstCreateOutput, firstInput, invalidInputs, secondCreateOutput
} from '../mocks/register.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe.only('Register integration tests', function() {
  afterEach(function() {
    sinon.restore()
  });

  invalidInputs.forEach(async (input) => {
    it('with invalid body it should return error', async function() {
      const { body, status  } = await chai.request(app).post('/register').send(input);
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
    });
  })
  
  it('with email in use should return error', async function() {
    sinon.stub(userModel,'findOne').resolves(user as unknown as userModel);

    const { body, status } = await chai.request(app).post('/register').send(emailNotAvailableInput);

    expect(status).to.be.equal(422);
    expect(body).to.be.deep.equal({ message: "E-mail is already in used" });
  });

  it('successfully', async function() {
    sinon.stub(userModel, 'findOne').resolves(undefined);
    sinon.stub(userModel, 'create').resolves(firstCreateOutput as userModel);
    sinon.stub(accountModel, 'create').resolves(secondCreateOutput as accountModel);
    
    const { body, status } = await chai.request(app).post('/register').send(firstInput)

    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(secondCreateOutput)
  });
});