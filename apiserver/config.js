const crypto = require('crypto');
const assert = require('assert');
require('dotenv').config();

assert(process.env.OIDC_ISSUER);
assert(process.env.OIDC_CLIENT_ID);
assert(process.env.OIDC_CLIENT_SECRET);

const issuerToKeycloakAPI = issuer => issuer.replace(/\/auth\//, '/auth/admin/');

module.exports = {
  OIDC_ISSUER: process.env.OIDC_ISSUER,
  OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET,
  KEYCLOAK_API_URI: process.env.KEYCLOAK_API_URI || issuerToKeycloakAPI(process.env.OIDC_ISSUER),
  JWT_SECRET: process.env.JWT_SECRET || crypto.randomBytes(32),
  STATIC_ROOT: 'static',
};
