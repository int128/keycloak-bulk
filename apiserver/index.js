const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const crypto = require('crypto');

const oidc = require('./routes/oidc');
const keycloak = require('./routes/keycloak');
const healthCheck = require('./routes/healthCheck');
const errorHandler = require('./routes/errorHandler');

const app = express();

app.use(morgan('combined', {skip: req => req.path === '/healthz'}));

app.use(session({
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
}));

app.use(oidc);
app.use(keycloak);

app.use(healthCheck);
app.use(errorHandler);

app.listen(5000);
