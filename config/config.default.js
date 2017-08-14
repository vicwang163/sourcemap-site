'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_{{keys}}';
  
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }
  
  config.middleware = ['robot']
  
  config.robot = {
    ua: [
      /Baiduspider/i
    ]
  }

  return config;
};

