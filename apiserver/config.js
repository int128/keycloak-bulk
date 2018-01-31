const assert = require('assert');
require('dotenv').config();

assert(process.env.OIDC_ISSUER);
assert(process.env.OIDC_CLIENT_ID);
assert(process.env.OIDC_CLIENT_SECRET);

module.exports = {
  OIDC_ISSUER: process.env.OIDC_ISSUER,
  OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET
};
