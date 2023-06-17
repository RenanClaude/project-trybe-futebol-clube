import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { team, teams } from './mocks/teamsMocks'

import { Response } from 'superagent';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { testToken, userDb } from './mocks/usersMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for login and token routes', () => {
  beforeEach(function () { sinon.restore(); });

  it('Should login successfully', async function() {
    const userMock = SequelizeUsers.build(userDb)
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);

    const { email } = userDb;
    const loginData = { email, password: 'secret_admin' }

    const response = await chai.request(app).post('/login').send(loginData);

    expect(response.status).to.equal(200);
  });

  it('No email should fail', async function() {
    const userMock = SequelizeUsers.build(userDb)
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);

    const loginData = { email: '', password: 'secret_admin' }
    const response = await chai.request(app).post('/login').send(loginData);

    expect(response.status).to.equal(400);
  });

  it('Email which does not exist in the database should faill', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const loginData = { email: 'email@nadaAVer.com', password: 'secret_admin' }
    const response = await chai.request(app).post('/login').send(loginData);

    expect(response.status).to.equal(401);
  });

  it('An invalid email should fail', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    const loginData = { email: 'This is not an email', password: 'secret_admin' }
    const response = await chai.request(app).post('/login').send(loginData);

    expect(response.status).to.equal(401);
  });

  it('If the user password is wrong it should fail', async function() {
    const userMock = SequelizeUsers.build(userDb)
    sinon.stub(SequelizeUsers, 'findOne').resolves(userMock);

    const { email } = userDb;
    const loginData = { email, password: 'wrong password here!' }
    const response = await chai.request(app).post('/login').send(loginData);

    expect(response.status).to.equal(401);
  });

  it('In "login/role" the token should be validated and returned to the user\'s function successfully',
   async function() {
    const response = await chai.request(app).get('/login/role')
  .set('authorization', testToken);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ role: "admin" });
  });

  it('In "login/role" if there is no token it should fail',
   async function() {
    const response = await chai.request(app).get('/login/role')
  .set('authorization', '');

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token not found' });
  });

  it('In "login/role" if the token is invalid it should fail',
   async function() {
    const response = await chai.request(app).get('/login/role')
  .set('authorization', 'Invalid token here!');

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
  });
}); 
