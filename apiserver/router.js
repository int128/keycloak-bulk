const Router = require('koa-router');
const koaJwt = require('koa-jwt');
const router = new Router();

const config = require('./config');
const OIDC = require('./services/OIDC');
const SessionToken = require('./services/SessionToken');
const HttpProxy = require('./services/HttpProxy');

router.get('/healthz', ctx => {
  ctx.body = 'OK';
});

router.post('/api/oidc/authentication-request', async ctx => {
  const { redirect_uri } = ctx.request.body;
  const oidc = await OIDC.create();
  ctx.body = oidc.createAuthenticationRequest(redirect_uri);
});

router.use(koaJwt({ secret: config.JWT_SECRET }));

router.post('/api/oidc/sessions', async ctx => {
  const { redirect_uri, state, nonce } = ctx.state.user;
  const oidc = await OIDC.create();
  const sessionToken = await oidc.getSessionToken(redirect_uri, state, nonce, ctx.query);
  ctx.body = { jwt: sessionToken.toJwt(config.JWT_SECRET) };
});

router.post('/api/oidc/sessions/refresh', async ctx => {
  const { refresh_token } = ctx.state.user;
  const oidc = await OIDC.create();
  const sessionToken = await oidc.refreshSessionToken(refresh_token);
  ctx.body = { jwt: sessionToken.toJwt(config.JWT_SECRET) };
});

const proxy = async ctx => {
  const sessionToken = new SessionToken(ctx.state.user);
  if (sessionToken.isValid()) {
    const httpProxy = new HttpProxy(sessionToken);
    await httpProxy.fetch(ctx);
  } else {
    ctx.status = 401;
    ctx.body = { error: 'invalid_session', error_message: 'Session has been expired' };
  }
};

router.get('/api/users', proxy);
router.post('/api/users', proxy);
router.get('/api/users/:id', proxy);

module.exports = router;
