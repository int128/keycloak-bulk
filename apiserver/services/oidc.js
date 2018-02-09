const { Issuer } = require('openid-client');
const crypto = require('crypto');
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

  getAuthenticationRequest(redirect_uri) {
    const state = crypto.randomBytes(32).toString('hex');
    const nonce = crypto.randomBytes(32).toString('hex');
    const authorization_url = this.client.authorizationUrl({
      redirect_uri,
      scope: 'openid email',
      state,
      nonce
    });
    return { authorization_url, redirect_uri, state, nonce };
  }

  async getTokenSet(authorizationRequest, query) {
    const { redirect_uri, state, nonce } = authorizationRequest;
    return await this.client.authorizationCallback(redirect_uri, query, { state, nonce });
  }

  async refresh(tokenSet) {
    return await this.client.refresh(tokenSet.refresh_token);
  }
}
