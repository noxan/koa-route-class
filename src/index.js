import route from 'koa-route';


export default class Router {
  constructor() {
    this.routeMap = new Map();
  }

  get(path, fn) {
    this.routeMap.set(path, fn);
  }

  use(router) {
    if (router.routes === undefined || router.routes.forEach === undefined) {
      throw new Error('You need to call use() with the result of router.routes() or provide a Map of routes.');
    }
    if (router.routes.length > 0) {
      router.routes.forEach((fn, path) => {
        this.routeMap.set(path, fn);
      });
    }
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
