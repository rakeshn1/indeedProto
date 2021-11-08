import NetworkService from '../network-service';

class UserClient {
  constructor(baseUri, basePath) {
    this._networkService = new NetworkService(baseUri);
    this._basePath = basePath;
  }
}

export default new UserClient('http://localhost:8080', '/api/user');
