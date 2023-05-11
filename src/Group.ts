import { Stats } from './Stats.js'
import { UniqueList } from './UniqueList.js'
import { ExtendedEntry } from './Entry.js'

/**
 * Interface representing a group of users of the app.
 */
export interface GroupInterface {
  id: number
  name: string
  members: UniqueList
  stats: Stats
  ranking: UniqueList
  favorites: UniqueList
  records: UniqueList<ExtendedEntry>
}

/**
 * Class representing a group of users of the app.
 */
export class Group implements GroupInterface {
  /**
   * Unique id of the group.
   * @type {number}
   */
  public readonly id: number

  /**
   * Name of the group.
   * @type {string}
   */
  public name: string

  /**
   * List of users of the group.
   * @type {UniqueList}
   */
  public members: UniqueList = new UniqueList()

  /**
   * Stats of the group.
   * @type {Stats}
   */
  public stats: Stats = new Stats()

  /**
   * List of favorite tracks of the group.
   * @type {UniqueList}
   */
  public favorites: UniqueList = new UniqueList()

  /**
   * List of records of the group.
   * @type {UniqueList}
   * @template {ExtendedEntry}
   */
  public records: UniqueList<ExtendedEntry> = new UniqueList<ExtendedEntry>()

  /**
   * Initializes a new instance of the Group class.
   * @param id Id of the group.
   * @param name Name of the group.
   */
  public constructor(id: number, name: string, ...members: number[]) {
    this.id = id
    this.name = name
    for (const member of members) this.members.add(member)
    this.stats.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }

  /**
   * Gets the ranking of the group based on the records.
   * @returns {UniqueList} Ranking of the group.
   */
  public get ranking(): UniqueList {
    const ranking = new UniqueList()
    const distances: { [id: number]: number } = {}
    for (const record of this.records.values) {
      for (const user of record.users.values) {
        if (distances[user]) distances[user] += record.km
        else distances[user] = record.km
      }
    }
    const sorted = Object.keys(distances).sort(
      (a, b) => distances[b] - distances[a]
    )
    for (const id of sorted)
      if (this.members.values.includes(parseInt(id))) ranking.add(parseInt(id))
    return ranking
  }
}
