import { Activity } from './Activity.js'
import { Stats } from './Stats.js'
import { UniqueList } from './UniqueList.js'
import { Entry } from './Entry.js'

/**
 * Interface representing a user of the app.
 */
export interface UserInterface {
  id: number
  name: string
  activity: Activity
  friends: UniqueList
  groups: UniqueList
  stats: Stats
  favorites: UniqueList
  active_challenges: UniqueList
  records: UniqueList<Entry>
}

/**
 * Class representing a user of the app.
 */
export class User implements UserInterface {
  /**
   * Unique id of the user.
   * @type {number}
   * @readonly
   */
  public readonly id: number

  /**
   * Name (or nickname) of the user.
   * @type {string}
   */
  public name: string

  /**
   * Activity of the user.
   * @type {Activity}
   */
  public activity: Activity

  /**
   * List of friends of the user.
   * @type {UniqueList}
   */
  public friends: UniqueList = new UniqueList()

  /**
   * List of groups of the user.
   * @type {UniqueList}
   */
  public groups: UniqueList = new UniqueList()

  /**
   * Stats of the user.
   * @type {UserStats}
   */
  public stats: Stats = new Stats()

  /**
   * List of favorite tracks of the user.
   * @type {UniqueList}
   */
  public favorites: UniqueList = new UniqueList()

  /**
   * List of active challenges of the user.
   * @type {UniqueList}
   */
  public active_challenges: UniqueList = new UniqueList()

  /**
   * List of tracks done by the user grouped by date.
   * @type {UniqueList}
   * @template {Entry}
   */
  public records: UniqueList<Entry> = new UniqueList<Entry>()

  /**
   * Initializes a new instance of the User class.
   * @param id Unique id of the user.
   * @param name Name (or nickname) of the user.
   * @param activity Activity of the user.
   */
  public constructor(id: number, name: string, activity: Activity) {
    this.id = id
    this.name = name
    this.activity = activity
    this.stats.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }
}
