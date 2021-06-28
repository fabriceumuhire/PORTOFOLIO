import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import app from '../app';
import server from '../server';
import Query from '../models/query.model';
import { newQuery, badQuery } from './mock/query.mock';

chai.use(chaiHttp);
chai.should();

let queryId;

describe('Queries API', () => {
  before(async () => {
    await server();
    await Query.deleteMany({});
  });
  describe('POST /api/query', () => {
    it('It should POST new Query', async () => {
      const post = await chai
        .request(app)
        .post('/api/v1/query')
        .send(newQuery);
      assert.equal(post.status, 201);
      post.should.have.property('status');
      post.body.should.have.property('message');
      queryId = await post.body.message._id;
    });
    it('It should NOT POST a query', (done) => {
      chai
        .request(app)
        .post('/api/v1/query')
        .send(badQuery)
        .end((error, res) => {
          res.should.have.status(400);
          res.should.have.property('status');
        });
      done();
    });
    it('It should GET all queries', (done) => {
      chai
        .request(app)
        .get('/api/v1/query')
        .end((error, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    });
    it('It should GET a single query', (done) => {
      chai
        .request(app)
        .get(`/api/v1/query/${queryId}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    });
    it('It should not GET any query', (done) => {
      chai
        .request(app)
        .get('/api/v1/queries')
        .end((error, res) => {
          res.should.have.status(404);
          res.should.have.property('status');
        });
      done();
    });
  });
});
