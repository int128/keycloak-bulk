const Koa = require('koa');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');

const router = require('./router');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(ctx.method, ctx.path, err);  //TODO: move ot logger
    if (err.name === 'OpenIdConnectError') {
      ctx.status = 401;
      ctx.body = { error: err.error, error_message: err.error_description };
    } else {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = { error_message: err.message };
    }
  }
});

app.use(koaStatic('static'));
app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000);
