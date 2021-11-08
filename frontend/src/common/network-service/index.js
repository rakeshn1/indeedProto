import axios from 'axios';

import store from '../../redux/store';
import { showNotification } from '../../redux/notifications';

const isFunction = (arg) => typeof arg === 'function';

class NetworkService {
  _getRequestConfig({ headers = {}, params = {}, restConfig = {} }) {
    return {
      ...restConfig,
      headers: { ...headers },
      params: { ...params },
    };
  }

  _handleError(error, shouldHandleNetworkAndServerError, shouldHandleError) {
    const _isNetworkError = NetworkService.isNetworkError(error);
    const _is5xxError = !_isNetworkError && NetworkService.is5xx(error);
    const _is4xxError = !_isNetworkError && NetworkService.is4xx(error);

    if (shouldHandleNetworkAndServerError) {
      if (_isNetworkError) {
        // TODO: Localize the following message. Perhaps also make `level` customizable.
        if (store && store.dispatch) {
          store.dispatch(
            showNotification({ level: 'info', message: 'You are not connected to the internet.' }),
          );
        }
      } else if (_is5xxError) {
        if (store && store.dispatch) {
          store.dispatch(
            showNotification({
              level: 'info',
              message: (error.response && error.response.data.message) || error.message,
            }),
          );
        }
      } else if (_is4xxError) {
        store.dispatch(
          showNotification({
            level: 'error',
            message: (error.response && error.response.data.message) || error.message,
          }),
        );
      }
    }

    if (!_isNetworkError && !_is5xxError && !_is4xxError) {
      const _shouldHandleError = isFunction(shouldHandleError)
        ? shouldHandleError(error)
        : shouldHandleError;

      if (_shouldHandleError) {
        if (store && store.dispatch) {
          store.dispatch(
            showNotification({
              level: 'info',
              message: (error.response && error.response.data.message) || error.message,
            }),
          );
        }
      }
    }
  }

  _handleSuccess(message, shouldShowSuccessNotification) {
    if (shouldShowSuccessNotification) {
      // TODO: Localize the following message. Perhaps also make `level` customizable.
      if (store && store.dispatch) {
        store.dispatch(showNotification({ level: 'success', message: message || 'Success' }));
      }
    }
  }

  constructor(baseUri) {
    this._baseUri = baseUri;
  }

  static isNetworkError(error) {
    // Network error occurs when request error exists but response error does not.
    return !!error.request && !error.response;
  }

  static is5xx(error) {
    return !!(error && error.response && error.response.status && error.response.status >= 500);
  }

  static is4xx(error) {
    return !!(
      error &&
      error.response &&
      error.response.status &&
      error.response.status >= 400 &&
      error.response.status < 500
    );
  }

  setDefaultHeaders(headers = {}) {
    this._defaults.headers = headers;
  }

  setDefaultParams(params = {}) {
    this._defaults.params = params;
  }

  async get({
    headers,
    url,
    params,
    restConfig = {},
    successCallback,
    errorCallback,
    onSuccessMessage = '',
    shouldHandleNetworkAndServerError = true,
    shouldHandleError = true,
  }) {
    const config = this._getRequestConfig({
      headers,
      params,
      restConfig: { withCredentials: true, ...restConfig },
    });
    const computedUrl = this._baseUri + url;
    try {
      const response = await axios.get(computedUrl, config);
      if (onSuccessMessage) {
        this._handleSuccess(onSuccessMessage);
      }
      if (isFunction(successCallback)) {
        return successCallback(response.data);
      }
      return response.data;
    } catch (error) {
      this._handleError(error, shouldHandleNetworkAndServerError, shouldHandleError);
      const err = (error.response && error.response.data) || error;
      if (isFunction(errorCallback)) {
        return errorCallback(err);
      }
      throw err;
    }
  }

  async delete({
    headers,
    url,
    params,
    restConfig = {},
    successCallback,
    errorCallback,
    onSuccessMessage = '',
    shouldHandleNetworkAndServerError = true,
    shouldHandleError = true,
  }) {
    const config = this._getRequestConfig({
      headers,
      params,
      restConfig: { withCredentials: true, ...restConfig },
    });
    const computedUrl = this._baseUri + url;
    try {
      const response = await axios.get(computedUrl, config);
      if (onSuccessMessage) {
        this._handleSuccess(onSuccessMessage);
      }
      if (isFunction(successCallback)) {
        return successCallback(response.data);
      }
      return response.data;
    } catch (error) {
      this._handleError(error, shouldHandleNetworkAndServerError, shouldHandleError);
      const err = (error.response && error.response.data) || error;
      if (isFunction(errorCallback)) {
        return errorCallback(err);
      }
      throw err;
    }
  }

  async post({
    headers,
    url,
    params,
    body,
    restConfig = {},
    successCallback,
    errorCallback,
    onSuccessMessage = '',
    shouldHandleNetworkAndServerError = true,
    shouldHandleError = true,
  }) {
    const config = this._getRequestConfig({
      headers,
      params,
      restConfig: { withCredentials: true, ...restConfig },
    });
    const computedUrl = this._baseUri + url;
    try {
      const response = await axios.post(computedUrl, body, config);
      if (onSuccessMessage) {
        this._handleSuccess(onSuccessMessage);
      }
      if (isFunction(successCallback)) {
        return successCallback(response.data);
      }
      return response.data;
    } catch (error) {
      this._handleError(error, shouldHandleNetworkAndServerError, shouldHandleError);
      const err = (error.response && error.response.data) || error;
      if (isFunction(errorCallback)) {
        return errorCallback(err);
      }
      throw err;
    }
  }

  async put({
    headers,
    url,
    params,
    body,
    restConfig = {},
    successCallback,
    errorCallback,
    onSuccessMessage = '',
    shouldHandleNetworkAndServerError = true,
    shouldHandleError = true,
  }) {
    const config = this._getRequestConfig({
      headers,
      params,
      restConfig: { withCredentials: true, ...restConfig },
    });
    const computedUrl = this._baseUri + url;
    try {
      const response = await axios.put(computedUrl, body, config);
      if (onSuccessMessage) {
        this._handleSuccess(onSuccessMessage);
      }
      if (isFunction(successCallback)) {
        return successCallback(response.data);
      }
      return response.data;
    } catch (error) {
      this._handleError(error, shouldHandleNetworkAndServerError, shouldHandleError);
      const err = (error.response && error.response.data) || error;
      if (isFunction(errorCallback)) {
        return errorCallback(err);
      }
      throw err;
    }
  }
}

export default NetworkService;
