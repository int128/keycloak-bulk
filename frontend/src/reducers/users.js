import { handle } from 'redux-pack';
import * as types from '../actions/types';
import Resource from '../models/Resource';

export default (state = new Resource(), action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOAD_USERS:
      return handle(state, action, {
        start: prevState => prevState.merge({ isLoading: true, error: null }),
        finish: prevState => prevState.merge({ isLoading: false }),
        failure: prevState => prevState.merge({ error: payload }),
        success: prevState => prevState.merge({ value: payload }),
      });
    default:
      return state;
  }
}
