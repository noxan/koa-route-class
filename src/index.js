import { join as pathJoin } from 'path';
import route from 'koa-route';


export default class Router {
  constructor(opts) {
    this.prefix = (opts || {}).prefix || '';
    this.routeMap = new Map();
  }

  get(path, fn) {
    this.routeMap.set(this.prefixPath(path), fn);
  }

  prefixPath(path) {
    return pathJoin(this.prefix, path);
  }

  use(router) {
    if (router.routes === undefined || router.routes.forEach === undefined) {
      throw new Error('You need to call use() with the result of router.routes() or provide a Map of routes.');
    }
    router.routes.forEach((fn, path) => {
      this.routeMap.set(this.prefixPath(path), fn);
    });
  }

  routes() {
    const self = this;
    const dispatch = async (ctx, next) => {
      const { app } = ctx;

      self.routeMap.forEach((fn, path) => {
        app.use(route.get(path, fn));
      });

      await next();
    }

    // inject routeMap as routes for nesting via use()
    dispatch.routes = self.routeMap;

    return dispatch;
  }
}
