'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/showstack', 'home.showStack');
};
