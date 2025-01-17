import * as chai from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import sinon from 'sinon';
import axiosClient from '../../../lib/axiosClient.js';
import app from '../../../config/server.js';
import { mockFiles } from '../../constants.js';

chai.use(chaiHttp);

const { expect } = chai;

describe('Secret API Routes', () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axiosClient, 'get');
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it('should return status 200 for GET /v1/secret/files', (done) => {
    axiosGetStub.resolves({ data: { files: mockFiles } });

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
});
