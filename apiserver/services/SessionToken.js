const { TokenSet } = require('openid-client');
const jsonwebtoken = require('jsonwebtoken');

module.exports = class SessionToken {
  constructor(values) {
    this.tokenSet = new TokenSet(values);
  }

  isValid() {
    return this.tokenSet.expired() === false;
  }

  getAuthorizationHeader() {
    if (this.tokenSet !== undefined) {
      return `${this.tokenSet.token_type} ${this.tokenSet.access_token}`;
    }
  }

  toJwt(secret) {
    const { id_token, access_token, refresh_token, token_type, expires_at } = this.tokenSet;
    return jsonwebtoken.sign({ id_token, access_token, refresh_token, token_type, expires_at }, secret);
  }
}
