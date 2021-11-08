import assert from 'assert';
import NetworkService from '../network-service';

const backendServerUrl = process.env.REACT_APP_BACKEND_URL;
assert.ok(backendServerUrl, 'Missing backend server url in env');

class BackendClient {
  constructor(baseUri, basePath) {
    this._networkService = new NetworkService(baseUri);
    this._basePath = basePath;
  }

  getCompanySalary = async () => {
    return Promise.resolve([
      {
        location: 'San Jose',
        title: 'Software Engineer',
        level: 'Senior',
        yearsOfExperience: '7',
        pay: '300000',
      },
    ]);
  };

  getCompanyPhotos = async (companyId, page, offset, limit) => {
    const data = await this._networkService.get({
      url: `/${this._basePath}/company/photos/${companyId}`,
      params: { page, offset, limit },
      restConfig: { withCredentials: false },
    });
    return data;
  };
}

export default new BackendClient(backendServerUrl, 'api');
