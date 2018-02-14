const Router = require('koa-router');
const router = new Router();

router.get('/healthz', ctx => ctx.body = 'OK');

module.exports = router;
