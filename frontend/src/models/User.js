import { Record } from 'immutable'

export default class User extends Record({
  id: null,
  username: null,
  initialPassword: null,
  firstName: null,
  lastName: null,
  email: null,
  enabled: true,
}) {
}
