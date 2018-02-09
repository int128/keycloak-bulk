const { TokenSet } = require('openid-client');

module.exports = class Session {
  constructor(session) {
    this.session = session;
  }

  getAuthenticationRequest() {
    return this.session.authenticationRequest;
  }

  setAuthenticationRequest(authenticationRequest) {
    this.session.authenticationRequest = authenticationRequest;
    this.session.tokenSet = undefined;
  }

  /**
   * Determine if the session exists and is not expired.
   */
  isValid() {
    const tokenSet = this.getTokenSet();
    if (tokenSet === undefined) {
      return false;
    }
    if (tokenSet.expired()) {
      return false;
    }
    return true;
  }

  getTokenSet() {
    if (this.session.tokenSet) {
      // restore from a plain object in the session
      return new TokenSet(this.session.tokenSet);
    }
  }

  getTokenSetAsAuthorizationHeader() {
    const tokenSet = this.getTokenSet();
    if (tokenSet !== undefined) {
      return `${tokenSet.token_type} ${tokenSet.access_token}`;
    }
  }

  setTokenSet(tokenSet) {
    const { token_type, access_token, expires_at } = tokenSet;
    this.session.tokenSet = { token_type, access_token, expires_at };
    this.session.authorizationRequest = undefined;
  }
}
