const Koa = require('koa');
const koaStatic = require('koa-static');
const koaSend = require('koa-send');

const config = require('./config');

const healthz = require('./routes/healthz');
const oidc = require('./routes/oidc');
const apiProxy = require('./routes/apiProxy');

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

app.use(koaStatic(config.STATIC_ROOT));

app.use(healthz.routes());
app.use(oidc.routes());
app.use(apiProxy.routes());

app.use(ctx => koaSend(ctx, `${config.STATIC_ROOT}/index.html`));

app.listen(5000);
