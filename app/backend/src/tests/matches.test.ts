import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { team, teams } from './mocks/teamsMocks'

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matchMock, matchesMock, resultMatchMock } from './mocks/matchesMock';
import { IMatch } from '../Interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team route tests', () => {

  beforeEach(function () { sinon.restore(); });

  it('Should return all matches', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchMock as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultMatchMock);
  });

  // it('Should return a team by id', async function() {
  //   // Para simular a estrutura por completo que o this.model  deveria retornar - incluindo o dataValues que vc tenta acessar - basta fazer um build  ao mockar o valor. (linha abaixo)
  //   const teamMock = SequelizeTeams.build(team)
  //   sinon.stub(SequelizeTeams, 'findByPk').resolves(teamMock);

  //   const { status, body } = await chai.request(app).get('/teams/1');

  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal(team);
  // });

  // it('Should return null because of the invalid id', async function() {
  //   sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
  //   const { status, body } = await chai.request(app).get('/teams/10000');

  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal(null);
  // });
}); 
