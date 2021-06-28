import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import path from 'path';
import app from '../app';
import Blog from '../models/blog.model';
import server from '../server';
import { tokenGenerator } from '../utils/auth.util';
import { loginUser } from './mock/user.mock';
import { newBlog, badBlog, updateBlog } from './mock/blog.mock';

chai.use(chaiHttp);
chai.should();

let blogId;
const token = tokenGenerator(loginUser);

describe('Article API', () => {
  before(async () => {
    await server();
    await Blog.deleteMany({});
  });
  // Get function tests
  describe('Blog tests', () => {
    it('It should POST a new article', async () => {
      const article = await chai
        .request(app)
        .post('/api/v1/blogs')
        .set('Authorization', token)
        .field(newBlog)
        .attach(
          'image',
          `${path.join(__dirname, '../uploads/img/ideas.jpg')}`,
        )
        .type('form');
      assert.equal(article.status, 201);
      article.should.have.status(201);
      article.should.have.property('status');
      article.body.should.have.property('message');
      blogId = article.body.message._id;
    }).timeout(50000);
    it('It should NOT POST a query', (done) => {
      chai
        .request(app)
        .post('/api/v1/blogs')
        .set('Authorization', token)
        .send(badBlog)
        .end((error, res) => {
          res.should.have.status(400);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    }).timeout(30000);
    it('It should NOT POST a query', (done) => {
      chai
        .request(app)
        .post('/api/v1/blogs')
        .field(badBlog)
        .attach(
          'image',
          `${path.join(__dirname, '../uploads/img/ideas.jpg')}`,
        )
        .type('form')
        .end((error, res) => {
          res.should.have.status(401);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    });
    it('It should GET all articles', (done) => {
      chai
        .request(app)
        .get('/api/v1/blogs')
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.should.have.property('status');
        });
      done();
    });
    it('It should NOT GET all articles', (done) => {
      chai
        .request(app)
        .get(`/api/v1/blog/${blogId}`)
        .end((error, res) => {
          res.should.have.status(404);
          res.should.have.property('status');
          // res.body.should.have.property('error');
        });
      done();
    });
    it('It should UPDATE a BLOG', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/blogs/${blogId}`)
        .set('Authorization', token)
        .field(updateBlog)
        .attach(
          'image',
          `${path.join(__dirname, '../uploads/img/review2.jpg')}`,
        )
        .type('form')
        .end((error, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    }).timeout(50000);
    it('It should GET a single blog', (done) => {
      chai
        .request(app)
        .get(`/api/v1/blogs/${blogId}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.have.property('status');
          res.body.should.have.property('message');
        });
      done();
    });
    it('It should NOT DELETE a single article', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/blog/${blogId}`)
        .set('Authorization', token)
        .end((error, res) => {
          res.should.have.status(404);
        });
      done();
    });
    it('It should DELETE a single article', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/blogs/${blogId}`)
        .set('Authorization', token)
        .end((error, res) => {
          res.should.have.status(204);
        });
      done();
    });
  });
});
