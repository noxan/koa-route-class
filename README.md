# koa-route-class

Class wrapper for koa-route with nesting support.

Attention: This is package is developed and used only with koa2, no idea if it works with koa1.

## Usage

```
import Koa from 'koa';
import Router from 'koa-route-class';


const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'hello koa-route-class!';
});

app.use(router.routes());

app.listen();
```

### Nesting

```
const nestedRouter = new Router();
const router = new Router();

nestedRouter.get('/nested', ctx => {
  ctx.body = 'hello, I am nested!';
});

router.get('/', ctx => {
  ctx.body = 'hello koa-route-class!';
});

router.use(nestedRouter);
```


## Credits

Based on https://github.com/koajs/route
