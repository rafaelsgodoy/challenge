import Api from './api';

import _ from 'lodash';
// import appointment from '../lejour_json/appointment.json';
// import user from '../lejour_json/usrer.json';
// import wedding from '../lejour_json/wedding.json';
// import invoice from '../lejour_json/invoice.json';
// import wedding_favorites from '../lejour_json/wedding_favorites.json';


const BASE_URL = "https://challenge.vercel.app/lejour_json/";
// const BASE_URL = "https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/";

// const BASE_URL = "http://localhost:3000/lejour_json/";

class Mock {

  async getInvoices(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();
    return Promise.all([
      Api.get(BASE_URL + 'invoice.json?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          data.push(...el.data);
        });
        return data;
      });
  }

  async getWeddings(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();

    return Promise.all([
      Api.get(BASE_URL + 'wedding.json?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          data.push(...el.data);
        });
        return data;
      });
  }


  async getWeddingsGroupByType(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();

    return Promise.all([
      Api.get(BASE_URL + 'wedding.json?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          data.push(...el.data);
        });
        return _.groupBy(data, 'STYLE');
        // return data;
      });

  }

  async getCustomers(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();

    return Promise.all([
      Api.get(BASE_URL + 'user.json?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          data.push(...el.data);
        });
        return data;
      });
  }


  async getEvents(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();

    return Promise.all([
      Api.get(BASE_URL + 'appointment.json?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          el.data.forEach(re => {
            data.push({
              title: re.VENDOR_CATEGORY.replace(/-/g, " ").toUpperCase(),
              date: re.BEGINS_AT,
              data: re
            });
          })

        });
        return data;
      });
  }

}

export default (new Mock());
