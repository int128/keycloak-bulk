const { Issuer } = require('openid-client');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const SessionToken = require('./SessionToken');
const config = require('../config');

module.exports = class OIDC {
  static async create() {
    const issuer = await Issuer.discover(config.OIDC_ISSUER);
    const client = new issuer.Client({
      client_id: config.OIDC_CLIENT_ID,
      client_secret: config.OIDC_CLIENT_SECRET
    });
    client.CLOCK_TOLERANCE = 60;
    return new OIDC(client);
  }

  constructor(client) {
    this.client = client;
  }

  createAuthenticationRequest(redirect_uri) {
    const state = crypto.randomBytes(32).toString('hex');
    const nonce = crypto.randomBytes(32).toString('hex');
    const authorization_url = this.client.authorizationUrl({
      redirect_uri,
      scope: 'openid email',
      state,
      nonce
    });
    const jwt = jsonwebtoken.sign({ redirect_uri, state, nonce }, config.JWT_SECRET);
    return { authorization_url, jwt };
  }

  async getSessionToken(redirect_uri, state, nonce, query) {
    const tokenSet = await this.client.authorizationCallback(redirect_uri, query, { state, nonce });
    return new SessionToken(tokenSet);
  }

  async refreshSessionToken(current_refresh_token) {
    const tokenSet = await this.client.refresh(current_refresh_token);
    return new SessionToken(tokenSet);
  }
}
