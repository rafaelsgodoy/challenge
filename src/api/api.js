import axios from 'axios';

class Api {
  constructor() {
    const service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess = (response) => {
    return response;
  };

  handleError = (error) => {
    return Promise.reject(error);
  };

  get(path) {
    return this.service.get(path);
  }

  patch(path, payload, callback) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload
    }).then((response) => callback(response.status, response.data));
  }
}

export default new Api();
