const fetch = require('node-fetch');
const config = require('../config');

const serverPathToClientURI = path => path.replace(/^\/api/, config.KEYCLOAK_API_URI);

const clientURIToServerPath = uri => uri.replace(config.KEYCLOAK_API_URI, '/api');

module.exports = class HttpClient {
  constructor(sessionToken) {
    this.sessionToken = sessionToken;
  }

  async fetch(ctx) {
    const uri = serverPathToClientURI(ctx.path);
    const options = {
      method: ctx.method,
      headers: {
        authorization: this.sessionToken.getAuthorizationHeader(),
        accept: 'application/json',
      },
    };
    if (ctx.is('json')) {
      options.body = JSON.stringify(ctx.request.body);
      options.headers['content-type'] = 'application/json';
    }
    const response = await fetch(uri, options);
    if (response.status === 201) {
      const location = response.headers.get('location');
      ctx.set('location', clientURIToServerPath(location));
      ctx.status = 302;
    } else if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType === 'application/json') {
        ctx.status = response.status;
        ctx.body = await response.json();
      } else {
        ctx.status = 500;
        ctx.body = { error: 'invalid_response', error_message: `Unexpected response type: ${contentType}` }
      }
    } else {
      ctx.status = response.status;
      if (response.headers.get('content-type') === 'application/json') {
        const json = await response.json();
        ctx.body = { error: response.status, error_message: json.errorMessage };
      } else {
        const text = await response.text();
        ctx.body = { error: response.status, error_message: text };
      }
    }
    return ctx;
  }
}
