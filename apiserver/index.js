const Koa = require('koa');
const koaStatic = require('koa-static');
const koaSession = require('koa-session');
const koaBody = require('koa-body');
const crypto = require('crypto');

const router = require('./router');

const app = new Koa();

app.keys = [crypto.randomBytes(32).toString('hex')];
app.use(koaSession(app));
app.use(koaBody());

app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaStatic('public'));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.name === 'OpenIdConnectError') {
      ctx.status = 401;
      ctx.body = { error: err.error, error_message: err.error_description };
    } else {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = { error_message: err.message };
    }
  }
});

app.listen(5000);
