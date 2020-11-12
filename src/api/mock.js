import Api from './api';

// import _ from 'lodash';

class Mock {

  async getInvoices() {
    const data = [];
    return Promise.all([
      Api.get('https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/invoice'),
    ])
      .then((values) => {
        values.forEach((el) => {
          data.push(...el.data);
        });
        return data;
      });
  }




}

export default (new Mock());
