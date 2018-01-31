import { Seq } from 'immutable'
import User from './User'

export default class UserFactory {
  /**
   * Parse text.
   * @param {string} text users as CSV or TSV
   * @returns {User[]}
   */
  static parseText(text) {
    return Seq(text.split(/\n/))
      .map(line => line.split(/,|\t/))
      .filter(columns => columns.length === 5)
      .map(([username, firstName, lastName, email, initialPassword]) =>
        new User({ username, initialPassword, firstName, lastName, email }))
      .toArray();
  }
}
