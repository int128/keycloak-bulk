const Router = require('koa-router');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');
const config = require('../config');
const SessionToken = require('../services/SessionToken');
const HttpProxy = require('../services/HttpProxy');

const router = new Router();

router.use(koaBody());

router.use(koaJwt({ secret: config.JWT_SECRET }));

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
