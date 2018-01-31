import { handle } from 'redux-pack';
import { List } from 'immutable';
import { INITIAL_IMPORT_USERS_TEXT } from '../constants'
import * as types from '../actions/types'
import UserFactory from '../models/UserFactory'
import ImportUser from '../models/ImportUser'
import Resource from '../models/Resource';

const importUsersOf = text =>
  UserFactory.parseText(text).map(user => new ImportUser({ user }))

export default (state = new Resource({ value: importUsersOf(INITIAL_IMPORT_USERS_TEXT) }), action) => {
  const { type } = action;
  switch (type) {
    case types.UPDATE_IMPORT_USERS_TEXT:
      let { text } = action;
      return state.merge({ value: importUsersOf(text) });

    case types.EXECUTE_IMPORT_USERS:
      let { payload } = action;
      return handle(state, action, {
        start: prevState => prevState.merge({ isLoading: true, error: null }),
        finish: prevState => prevState.merge({ isLoading: false }),
        failure: prevState => prevState.merge({ error: payload }),
        success: prevState => prevState,
      });

    case types.NOTIFY_IMPORT_USER:
      let { index, resource } = action;
      let list = List(state.value);
      let altered = list.set(index, list.get(index).merge({ resource })).toArray();
      return state.merge({ value: altered });

    default:
      return state;
  }
}
