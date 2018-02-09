const Router = require('koa-router');
const router = new Router();

const config = require('./config');
const OIDC = require('./services/oidc');
const Session = require('./services/session');
const HttpClient = require('./services/httpClient');

router.get('/healthz', ctx => {
  ctx.body = 'OK';
});

router.get('/login', async ctx => {
  const oidc = await OIDC.create();
  const redirectUri = `${ctx.protocol}://${ctx.get('host')}/login/callback`;
  const authenticationRequest = oidc.getAuthenticationRequest(redirectUri);
  const session = new Session(ctx.session);
  session.setAuthenticationRequest(authenticationRequest);
  ctx.redirect(authenticationRequest.authorization_url);
});

router.get('/login/callback', async ctx => {
  const session = new Session(ctx.session);
  const authenticationRequest = session.getAuthenticationRequest();
  if (authenticationRequest) {
    const oidc = await OIDC.create();
    const tokenSet = await oidc.getTokenSet(authenticationRequest, ctx.query);
    session.setTokenSet(tokenSet);
  }
  ctx.redirect('/');
});

router.get('/logout', ctx => {
  ctx.session = null;
  ctx.redirect('/');
});

const KEYCLOAK_API_URI = config.OIDC_ISSUER.replace(/\/auth\//, '/auth/admin/');
const serverPathToClientURI = path => path.replace(/^\/api/, KEYCLOAK_API_URI);
const clientURIToServerPath = uri => uri.replace(KEYCLOAK_API_URI, '/api');

const proxy = async ctx => {
  const session = new Session(ctx.session);
  if (session.isValid()) {
    const uri = serverPathToClientURI(ctx.path);
    const httpClient = new HttpClient(session);
    let response;
    if (ctx.is('json')) {
      response = await httpClient.fetch(uri, ctx.method, JSON.stringify(ctx.request.body), 'application/json');
    } else {
      response = await httpClient.fetch(uri, ctx.method);
    }
    if (response.status === 201) {
      const location = response.headers.get('location');
      ctx.set('location', clientURIToServerPath(location));
      ctx.status = 302;
    } else if (response.ok) {
      ctx.status = response.status;
      ctx.body = await response.json();
    } else {
      ctx.status = response.status;
      if (response.headers.get('content-type') === 'application/json') {
        const json = await response.json();
        ctx.body = { error: response.status, error_message: json.errorMessage };
      } else {
        const text = await response.text();
        ctx.body = { error: response.status, error_message: text };
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = { error: 'invalid_session', error_message: 'Session has been expired' };
  }
};

router.get('/api/users', proxy);
router.post('/api/users', proxy);
router.get('/api/users/:id', proxy);

module.exports = router;
