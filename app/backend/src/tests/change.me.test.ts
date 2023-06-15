import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { team, teams } from './mocks/teamsMocks'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Should return all teams', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    // expect(body).to.deep.equal(teams);
  });

  it('Should return a team by id', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    // expect(body).to.deep.equal(team);
  });

  // it('Should return null because of the invalid id', async function() {
  //   // sinon.stub(SequelizeTeams, 'findByPk').resolves(null as any);

  //   const { status, body } = await chai.request(app).get('/teams/1000');

  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal(null);
  // });
}); 
