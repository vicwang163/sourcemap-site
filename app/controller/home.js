'use strict';
var sourcemapStack = require('sourcemap-stack')

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      yield this.ctx.render('index.tpl')
    }
    * showStack () {
      let params = this.ctx.request.body
      // get call stack
      let stacks = sourcemapStack.getStackByError(params.desc)
      // add map url
      sourcemapStack.getMapPath(stacks, params)
      // transform real path
      stacks = yield sourcemapStack.getRealStack(stacks, params)
      this.ctx.body = stacks
    }
  }
  return HomeController;
};
