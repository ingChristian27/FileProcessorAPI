import { expect } from 'chai';
import sinon from 'sinon';
import axiosClient from '../../lib/axiosClient.js';
import getFilesApi from '../../services/files/getFilesApi.js';
import { mockFiles } from '../constants.js';

describe('getFilesApi function', () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axiosClient, 'get');
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it('should return mocked file list', async () => {
    axiosGetStub.resolves({ data: { files: mockFiles } });
    const files = await getFilesApi();
    expect(files).to.deep.equal(mockFiles);
  });
});
