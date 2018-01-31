const { TokenSet } = require('openid-client');

module.exports = class Session {
  constructor(session) {
    this.session = session;
  }

  getAuthorizationRequest() {
    return this.session.authorizationRequest;
  }

  setAuthorizationRequest(authorizationRequest) {
    this.session.authorizationRequest = authorizationRequest;
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
    this.session.tokenSet = tokenSet;
  }
}
