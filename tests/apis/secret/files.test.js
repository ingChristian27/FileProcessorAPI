import * as chai from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../../../index.js';

chai.use(chaiHttp);

const { expect } = chai;

describe('Secret API Routes', () => {
  it('should return status 200 for GET /v1/secret/files', (done) => {
    request
      .execute(app)
      .get('/v1/secret/files')
      .end((err, res) => {
        if (err) done(err);
        const { files } = res.body;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(files).to.be.an('array');
        expect(files).to.have.lengthOf(2);
        done();
      });
  });

  it('should return status 200 for GET /v1/secret/file', (done) => {
    request
      .execute(app)
      .get('/v1/secret/file')
      .end((err, res) => {
        if (err) done(err);
        const { file } = res.body;
        expect(res.status).to.equal(200);
        expect(file).to.be.an('object');
        done();
      });
  });
});
