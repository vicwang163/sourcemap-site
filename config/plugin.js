'use strict';
const path = require('path');
// had enabled by egg
exports.static = true;

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

exports.ua = {
  enable: true,
  path: path.join(__dirname, './egg-ua')
}