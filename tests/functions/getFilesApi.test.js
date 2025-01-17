import { expect } from 'chai';
import sinon from 'sinon';
import axiosClient from '../../lib/axiosClient.js';
import getFilesApi from '../../services/files/getFilesApi.js';
import { mockFiles } from '../constants.js';

describe('getFilesApi function', () => {
  let axiosGetStub;
  const mockFilesUrl = '/path/to/mock/files';

  beforeEach(() => {
    axiosGetStub = sinon.stub(axiosClient, 'get');
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it('should return the file list as an array from the API', async () => {
    axiosGetStub.resolves({ data: { files: mockFiles } });
    const files = await getFilesApi(mockFilesUrl);

    expect(files).to.be.an('array');
    expect(files).to.deep.equal(mockFiles);
  });
});
