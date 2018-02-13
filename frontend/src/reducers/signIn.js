import oidc from '../services/OIDC';

export default (state = {
  isAuthenticated: oidc.getAuthorizationHeader() !== undefined,
}, action) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}
