import { UniqueList } from './UniqueList'

/**
 * A class that stores an entry of a record in the app.
 * An entry is defined by:
 *  - A date.
 *  - A list of tracks done in that date.
 */
export type Entry = {
  /**
   * Date of the entry.
   * @type {string}
   */
  date: string
  /**
   * List of tracks done in that date.
   * @type {UniqueList}
   */
  tracks: UniqueList
}

/**
 * A class that stores an extended entry of a record in the app.
 */
export type ExtendedEntry = Entry & {
  users: UniqueList
  km: number
}
