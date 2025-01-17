import * as chai from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import sinon from 'sinon';
import axiosClient from '../../../lib/axiosClient.js';
import app from '../../../config/server.js';
import { mockFiles, mockCSVFileComplete, mockCSVFileIncomplete } from '../../constants.js';

chai.use(chaiHttp);

const { expect } = chai;

const PATH = '/v1/secret/files';
const MESSAGE_ERROR = 'Network error';

describe('Secret API Routes', () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axiosClient, 'get');
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it('should return a list of processed files with status 200 for GET /v1/secret/files', (done) => {
    // Resolves with a list of file names to be processed
    axiosGetStub.onCall(0).resolves({ data: { files: mockFiles } });

    // Resolves with a complete and valid CSV file
    axiosGetStub.onCall(2).resolves({ data: mockCSVFileComplete });

    // Resolves with an incomplete CSV file missing some fields
    axiosGetStub.onCall(3).resolves({ data: mockCSVFileIncomplete });

    // Resolves with a CSV file containing an incorrect header
    axiosGetStub
      .onCall(4)
      .resolves({ data: 'wrongHeader\n1,text,2,abcd1234abcd1234abcd1234abcd1234' });

    // Resolves with a CSV file containing valid rows and incomplete rows
    axiosGetStub.onCall(5).resolves({
      data: 'file,text,number,hex\nvalidFile,validText,1234,abcd1234abcd1234abcd1234abcd1234\n,,,\nvalidFile,validText,abcd,123',
    });

    // Resolves with a non-CSV response (HTML content)
    axiosGetStub.onCall(6).resolves({ data: '<html><body>Error</body></html>' });

    request
      .execute(app)
      .get(PATH)
      .end((error, response) => {
        if (error) done(error);

        const { files: processedFiles } = response.body;

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(processedFiles).to.be.an('array');
        expect(processedFiles).to.have.lengthOf(1);
        expect(processedFiles[0].lines).to.have.lengthOf(10);
        expect(processedFiles[0].file).to.equal('test6.csv');

        done();
      });
  });

  it('should handle network errors gracefully', (done) => {
    axiosGetStub.onFirstCall().rejects(new Error(MESSAGE_ERROR));

    request
      .execute(app)
      .get('/v1/secret/files')
      .end((error, response) => {
        if (error) done(error);

        const { message } = response.body;

        expect(response.status).to.equal(500);
        expect(message).to.equal(MESSAGE_ERROR);
        expect(response.body).to.be.an('object');

        done();
      });
  });
});
