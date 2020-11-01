import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { assert } from 'console';

describe('App E2E', () => {
  let app: INestApplication;
  let myToken;
  let clients;
  let policies;

  function bearerRequest(endpoint: string, query = {}) {
    return request(app.getHttpServer())
      .get(endpoint)
      .query(query)
      .set('Authorization', 'Bearer ' + myToken);
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`Health Check`, () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Ok.');
  });

  it(`Unauthorized Request`, () => {
    return request(app.getHttpServer())
      .get('/clients')
      .expect(401);
  });

  it(`Invalid Login Petition`, () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'test', password: 'test12234' })
      .expect(401);
  });

  it(`Login Petition`, done => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ username: 'test', password: 'test1234' })
      .expect(201)
      .then(response => {
        myToken = response.body.token;
        done();
      });
  });

  it(`Get Clients with token`, done => {
    return bearerRequest('/clients', { name: '' })
      .expect(200)
      .then(response => {
        clients = response.body;
        done();
      });
  });

  it(`Get Policies with token`, done => {
    return bearerRequest('/policies')
      .expect(200)
      .then(response => {
        policies = response.body;
        done();
      });
  });

  it(`Get Single Client`, () => {
    return bearerRequest(`/clients/${clients[0].id}`).expect(200);
  });

  it(`Get Client Policies`, () => {
    return bearerRequest(`/clients/${clients[0].id}/policies`).expect(200);
  });

  it(`Get Single Policy`, () => {
    return bearerRequest(`/policies/${policies[0].id}`).expect(200);
  });
  

  it(`Get Clients with Limit`, (done) => {
    return bearerRequest('/clients', { name: '', limit: '2' })
      .expect(200)
      .then( response => {
        expect(response.body.length).toBe(2);
        done();
      });
  });

  it(`Get Policies with Limit`, (done) => {
    return bearerRequest('/policies', { limit: '2' })
      .expect(200)
      .then( response => {
        expect(response.body.length).toBe(2);
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
