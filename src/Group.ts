import { Stats } from './Stats.js'
import { UniqueList } from './UniqueList.js'
import { Entry } from './Entry.js'

/**
 * Class representing a group of users of the app.
 */
export class Group {
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
   * @template {Entry}
   */
  public records: UniqueList<Entry> = new UniqueList()

  /**
   * Initializes a new instance of the Group class.
   * @param id Id of the group.
   * @param name Name of the group.
   */
  public constructor(id: number, name: string) {
    this.id = id
    this.name = name
    this.stats.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }
}
