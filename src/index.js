import route from 'koa-route';


export default class Router {
  constructor() {
    this.routeMap = new Map();
  }

  get(path, fn) {
    this.routeMap.set(path, fn);
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

    return dispatch;
  }
}
