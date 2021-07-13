import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../models/user.model';
import server from '../server';
import {
  newUser,
  wrongUser,
  wrongPass,
  loginUser,
} from './mock/user.mock';

chai.use(chaiHttp);
chai.should();

describe('Register API', () => {
  before(async () => {
    await server();
    await User.deleteMany({});
  });
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
        });
      done();
    });
    it('It should not POST new user(wrong email)', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/register')
        .send(wrongUser)
        .end((error, res) => {
          res.should.have.status(402);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    });
    it('It should not POST new user(wrong password)', (done) => {
      chai
        .request(app)
        .post('/api/v1/user/register')
        .send(wrongPass)
        .end((error, res) => {
          res.should.have.status(402);
          res.should.have.property('status');
          res.body.should.have.property('message');
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
          res.should.have.status(400);
          res.should.have.property('status');
          res.body.should.have.property('error');
        });
      done();
    });
    it('Login with invalid password', (done) => {
      const wrongPassword = {
        email: newUser.email,
        password: wrongPass.password,
      };
      // send request to the app
      chai
        .request(app)
        .post('/api/v1/user/login')
        .send(wrongPassword)
        .end((error, res) => {
          res.should.have.status(401);
          res.should.have.property('status');
        });
      done();
    });
    it('Login with invalid email', (done) => {
      const errorEmail = {
        email: wrongUser.email,
        password: newUser.password,
      };
      // send request to the app
      chai
        .request(app)
        .post('/api/v1/user/login')
        .send(errorEmail)
        .end((error, res) => {
          res.should.have.status(401);
          res.should.have.property('status');
        });
      done();
    });
    it('It should GET all users', (done) => {
      chai
        .request(app)
        .get('/api/v1/user')
        .end((error, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
        });
      done();
    });
    it('User should login', (done) => {
      // send request to the app
      try {
        chai
          .request(app)
          .post('/api/v1/user/login')
          .send(loginUser)
          .end((error, res) => {
            res.should.have.status(200);
            res.should.have.property('status');
          });
        done();
      } catch (error) {
        return error.message[0];
      }
    });
  });
});
