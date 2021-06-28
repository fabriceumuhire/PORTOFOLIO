import chai from "chai";
import chaiHttp from "chai-http";
import app from '../app';
import server from '../server';
import Query from "../models/query.model";
import { newQuery, badQuery } from './mock/query.mock';


chai.use(chaiHttp);
chai.should();

let id;

describe("Queries API", () => {
    before(async () => {
        await server();
        await Query.deleteMany({});
    });
    describe("POST /api/query", async () => {
        it('It should POST new Query', (done) => {
            chai
                .request(app)
                .post('/api/v1/query')
                .send(newQuery)
                .end((error, res) => {
                    res.should.have.status(201);
                    res.should.have.property('status');
                    res.body.should.have.property('message');
                    console.log(res.body);
                    id = res.body.message._id;
                });
                done();
            });
        it("It should NOT POST a query", (done) => {
            chai
                .request(app)
                .post('/api/v1/query')
                .send(badQuery)
                .end((error,res) => {
                    res.should.have.status(400);
                    res.should.have.property('status');
                });
            done();
            });
        it("It should GET all queries", (done) => {
            chai.request(app)
                .get("/api/v1/query")
                .end((error,res) => {
                res.should.have.status(200);
                res.should.have.property('status');
                });
            done();
            });
        it("It should GET a single query", (done) => {
            chai
                .request(app)
                .get(`/api/v1/query/${id}`)
                .end((error,res) => {
                    res.should.have.status(200);
                    res.should.have.property('status');
                });
            done();
            });
        it("It should not GET any query", (done) => {
            chai
                .request(app)
                .get("/api/v1/querie")
                .end((error,res) => {
                    res.should.have.status(404);
                    res.should.have.property('status');
                });
            done();
        });
    });
});
