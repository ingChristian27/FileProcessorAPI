import { expect } from 'chai';
import sinon from 'sinon';
import axiosClient from '../../lib/axiosClient.js';
import getFileApi from '../../services/files/getFileApi.js';
import { mockCSVFileIncomplete } from '../constants.js';

describe('getFileApi function', () => {
  let axiosGetStub;
  const mockFileUrl = '/path/to/mock/file';

  beforeEach(() => {
    axiosGetStub = sinon.stub(axiosClient, 'get');
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it('should return the file content as a string from the API', async () => {
    axiosGetStub.resolves({ data: mockCSVFileIncomplete });

    const fileContent = await getFileApi(mockFileUrl);

    expect(fileContent).to.be.a('string');
    expect(fileContent).to.equal(mockCSVFileIncomplete);
  });
});
