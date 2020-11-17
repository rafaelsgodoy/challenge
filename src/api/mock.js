import Api from './api';

import _ from 'lodash';

class Mock {

  async getInvoices(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();
    return Promise.all([
      Api.get('https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/invoice?' + _p),
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
      Api.get('https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/wedding?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          data.push(...el.data);
        });
        return _.groupBy(data, 'STYLE');
      });
  }


  async getCustomers(params) {
    const data = [];
    const _p = new URLSearchParams(params).toString();

    return Promise.all([
      Api.get('https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/user?' + _p),
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
      Api.get('https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/appointment?' + _p),
    ])
      .then((values) => {
        values.forEach((el) => {
          el.data.forEach(re => {
            data.push({
              title: re.VENDOR_CATEGORY.replace("-"," ").toUpperCase(),
              date: re.BEGINS_AT,
            });
          })

        });
        return data;
      });
  }

}

export default (new Mock());
