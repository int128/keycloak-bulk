const Router = require('koa-router');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');
const config = require('../config');
const OIDC = require('../services/OIDC');

const router = new Router();

router.use(koaBody());

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
  const jwt = sessionToken.toJwt(config.JWT_SECRET);
  ctx.body = { jwt };
});

router.post('/api/oidc/sessions/refresh', async ctx => {
  const { refresh_token } = ctx.state.user;
  const oidc = await OIDC.create();
  const sessionToken = await oidc.refreshSessionToken(refresh_token);
  const jwt = sessionToken.toJwt(config.JWT_SECRET);
  ctx.body = { jwt };
});

module.exports = router;
