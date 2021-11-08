import assert from 'assert';
import NetworkService from '../network-service';

const backendServerUrl = process.env.REACT_APP_BACKEND_URL;
assert.ok(backendServerUrl, 'Missing backend server url in env');

class CommonClient {
  constructor(baseUri, basePath) {
    this._networkService = new NetworkService(baseUri);
    this._basePath = basePath;
  }

  async getCountries() {
    return this._networkService.get({
      url: `${this._basePath}/countries`,
    });
  }

  async getStatesForSelectedCountry(countryName) {
    return this._networkService.get({
      url: `${this._basePath}/${countryName}/states`,
    });
  }

  async getCitiesForSelectedStateAndCountry(stateName, countryName) {
    return this._networkService.get({
      url: `${this._basePath}/${countryName}/${stateName}/cities`,
      // shouldHandleError: false,
    });
  }

  async getStateAndCityForEnteredZipCode(zipCode, countryName) {
    return this._networkService.get({
      params: { zipCode },
      url: `${this._basePath}/${countryName}/zipQuery`,
      // shouldHandleError: false,
    });
  }

  async registerUser(payload) {
    return this._networkService.post({
      body: payload,
      onSuccessMessage: 'Registered Successfully!',
      url: `${this._basePath}/register/user`,
    });
  }

  async registerRestaurant(payload) {
    return this._networkService.post({
      body: payload,
      onSuccessMessage: 'Registered Successfully!',
      url: `${this._basePath}/register/restaurant`,
    });
  }

  async validateSession() {
    return this._networkService.get({
      url: `${this._basePath}/validate-session`,
    });
  }

  async validateUserEmail(email) {
    return this._networkService.post({
      body: { email },
      url: `${this._basePath}/registration/validate-email/user`,
    });
  }

  async validateRestaurantEmail(email) {
    return this._networkService.post({
      body: { email },
      url: `${this._basePath}/registration/validate-email/restaurant`,
    });
  }
}

export default new CommonClient(
  process.env.NODE_ENV === 'development' ? '' : backendServerUrl,
  '/api/common',
);
