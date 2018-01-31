const express = require('express');
const asyncRoute = require('../async-route');
const config = require('../config');
const Session = require('../services/session');
const httpClient = require('../services/httpClient');

const KEYCLOAK_API_URI = config.OIDC_ISSUER.replace(/\/auth\//, '/auth/admin/');

const router = express.Router();

function serverPathToClientURI(path) {
  return path.replace(/^\/api/, KEYCLOAK_API_URI);
}

function clientURIToServerPath(uri) {
  return uri.replace(KEYCLOAK_API_URI, '/api');
}

async function proxy(serverRequest, serverResponse) {
  const session = new Session(serverRequest.session);
  if (!session.isValid()) {
    serverResponse.status(401).send({
      error: 'invalid_session',
      error_message: 'Session has been expired',
    });
    return;
  }
  const uri = serverPathToClientURI(serverRequest.path);
  const clientResponse = await new httpClient(session).fetch(uri, serverRequest.method, serverRequest.body, serverRequest.get('content-type'));
  const { status } = clientResponse;
  if (status === 201) {
    const location = clientResponse.headers.get('location');
    serverResponse
      .append('location', clientURIToServerPath(location))
      .status(302)
      .end();
  } else if (clientResponse.ok) {
    const body = await clientResponse.json();
    serverResponse.status(status).send(body);
  } else {
    const body = await clientResponse.json();
    serverResponse.status(status).send({
      error: clientResponse.status,
      error_message: body.errorMessage,
    });
  }
}

router.use(express.json());

router.get('/api/users', asyncRoute(proxy));
router.post('/api/users', asyncRoute(proxy));
router.get('/api/users/:id', asyncRoute(proxy));

module.exports = router;
