const express = require('express');
const asyncRoute = require('../async-route');
const OIDC = require('../services/oidc');
const Session = require('../services/session');

const router = express.Router();

// TODO: static content filter
router.get('/', (req, res) => {
  const session = new Session(req.session);
  if (session.isValid()) {
    res.send('OK');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', asyncRoute(async (req, res) => {
  const oidc = await OIDC.create();
  const redirectUri = `${req.protocol}://${req.get('host')}/login/callback`;
  const authorizationRequest = oidc.getAuthorizationRequest(redirectUri);
  const session = new Session(req.session);
  session.setAuthorizationRequest(authorizationRequest);
  res.redirect(authorizationRequest.url);
}));

router.get('/login/callback', asyncRoute(async (req, res) => {
  const session = new Session(req.session);
  const authorizationRequest = session.getAuthorizationRequest();
  if (authorizationRequest) {
    const oidc = await OIDC.create();
    session.setTokenSet(await oidc.getTokenSet(authorizationRequest, req.query));
  }
  res.redirect('/');
}));

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
