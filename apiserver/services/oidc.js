const { Issuer } = require('openid-client');
const crypto = require('crypto');
const config = require('../config');

class AuthenticationRequest {
  constructor(url, redirectUri, state, nonce) {
    this.url = url;
    this.redirectUri = redirectUri;
    this.state = state;
    this.nonce = nonce;
  }
}

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

  getAuthorizationRequest(redirectUri) {
    const state = crypto.randomBytes(32).toString('hex');
    const nonce = crypto.randomBytes(32).toString('hex');
    const url = this.client.authorizationUrl({
      redirect_uri: redirectUri,
      scope: 'openid email',
      state,
      nonce
    });
    return new AuthenticationRequest(url, redirectUri, state, nonce);
  }

  async getTokenSet(authorizationRequest, query) {
    const {redirectUri, state, nonce} = authorizationRequest;
    return await this.client.authorizationCallback(redirectUri, query, {state, nonce});
  }

  async refresh(tokenSet) {
    return await this.client.refresh(tokenSet.refresh_token);
  }
}
