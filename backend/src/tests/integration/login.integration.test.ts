import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import App from '../../app';
import userModel from '../../database/models/Users';
import { IUser } from '../../interfaces';
import {
  inputWithoutEmail,
  inputWithoutPassword,
  invalidEmailInput,
  invalidPassowrdlInput, token, user,
  validLoginInput
} from '../mocks/login.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai; 

describe('Login integration tests', function() {
  afterEach(function() {
    sinon.restore()
  });

  it('without the email in the body of the request it should return error', async function() {
    const { body, status  } = await chai.request(app).post('/login').send(inputWithoutEmail);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
  });

  it('without the password in the body of the request it should return error', async function() {
    const { body, status  } = await chai.request(app).post('/login').send(inputWithoutPassword);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'Some required fields are missing' });
  });

  it('with invalid email should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(undefined);

    const { body, status } = await chai.request(app).post('/login').send(invalidEmailInput)
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Incorrect email or password" });
  });

  it('with invalid password should return error', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as IUser | any);
    sinon.stub(bcrypt, 'compareSync').returns(false);

    const { body, status } = await chai.request(app).post('/login').send(invalidPassowrdlInput)
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Incorrect email or password" });
  });

  it('successfully should return token', async function() {
    sinon.stub(userModel, 'findOne').resolves(user as IUser | any);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(jwt, 'sign').resolves(token);

    const { body, status } = await chai.request(app).post('/login').send(validLoginInput)

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ token });
  });
});