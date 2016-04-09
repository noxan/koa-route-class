# koa-route-class

Class wrapper for koa-route with nesting support.

Attention: This is package is developed and used only with koa2, no idea if it works with koa1.

## Usage

```
import Router from 'koa-route-class';

router.get('/', ctx => {
  ctx.body = 'hello koa-route-class!';
});
```
