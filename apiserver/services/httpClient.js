const fetch = require('node-fetch');
const OIDC = require('../services/oidc');

module.exports = class httpClient {
  constructor(session) {
    this.session = session;
  }

  async fetch(uri, method, body, contentType) {
    const options = {
      method,
      headers: {
        authorization: this.session.getTokenSetAsAuthorizationHeader(),
        accept: 'application/json',
      },
    };
    if (body !== undefined) {
      options.body = body;
    }
    if (contentType !== undefined) {
      options.headers['content-type'] = contentType
    }
    const response = await fetch(uri, options);
    if (response.status === 401) {
      const oidc = await OIDC.create();
      this.session.setTokenSet(await oidc.refresh(this.session.getTokenSet()));
      return await this.fetch(uri, method, body, contentType);
    } else {
      return response;
    }
  }
}
