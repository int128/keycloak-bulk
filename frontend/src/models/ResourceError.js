import { Record } from 'immutable'

export default class ResourceError extends Record({
  code: null,
  message: null,
  status: 0,
}) {
}
