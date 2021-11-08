import NetworkService from '../network-service';

class RestaurantClient {
  constructor(baseUri, basePath) {
    this._networkService = new NetworkService(baseUri);
    this._basePath = basePath;
  }
}

export default new RestaurantClient('http://localhost:8080', '/api/restaurant');
