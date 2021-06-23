import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../models/user.model';
import server from '../server';
import { newUser, wrongUser, wrongPass } from './mock/user.mock';

chai.use(chaiHttp);
chai.should();

describe('Register API', () => {
  /* before(async () => {
    await server();
    await User.deleteMany({});
  });*/
  describe('POST /api/routes', async () => {
    it('It should POST new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/register')
        .send(newUser)
        .end((error, res) => {
          res.should.have.property('status');
          res.body.should.have.property('message');
          res.should.have.status(201);
          console.log(res.body);
        });
      done();
    });
    it('It should not POST new user(wrong email)', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/register')
        .send(wrongUser)
        .end((error, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('It should not POST new user(wrong password)', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/register')
        .send(wrongPass)
        .end((error, res) => {
          res.should.have.status(400);
        });
      done();
    });
    it('It should not POST existing user', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/register')
        .send(newUser)
        .end((error, res) => {
          res.body.should.have.property('error');
        });
      done();
    });
  });
});
