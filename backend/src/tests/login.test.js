import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { newUser, wrongUser, wrongPass } from './mock/user.mock';

chai.use(chaiHttp);
chai.should();

describe('User login', () => {
  it('User should login', (done) => {
    const credentials = {
      email: newUser.email,
      password: newUser.password,
    };
    // send request to the app
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(credentials)
      .end((error, res) => {
        res.should.have.status(200);
        console.log(res.body);
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
      });
    done();
  });
  it('It should GET all users', (done) => {
    chai
      .request(app)
      .get('/api/v1/user')
      .end((error, res) => {
        res.should.have.status(200);
        console.log(res.body);
      });
    done();
  });
});
