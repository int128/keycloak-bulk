import { Record } from 'immutable'

export default class Resource extends Record({
  isLoading: false,
  value: null,
  error: null,
}) {
}
