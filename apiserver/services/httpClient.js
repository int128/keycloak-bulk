const fetch = require('node-fetch');
const OIDC = require('../services/oidc');

module.exports = class httpClient {
  constructor(session) {
    this.session = session;
  }

  async fetch(uri, method, body, contentType) {
    const response = await fetch(uri, {
      headers: {
        authorization: this.session.getTokenSetAsAuthorizationHeader(),
        'content-type': contentType,
        accept: 'application/json',
      },
      method,
      body: (body !== undefined) ? JSON.stringify(body) : undefined,
    });
    if (response.status === 401) {
      const oidc = await OIDC.create();
      this.session.setTokenSet(await oidc.refresh(this.session.getTokenSet()));
      return await this.fetch(uri, method, body, contentType);
    } else {
      return response;
    }
  }
}
