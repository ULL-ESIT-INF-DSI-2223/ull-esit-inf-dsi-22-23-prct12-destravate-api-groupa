import { Activity } from './Activity.js'
import { UserStats } from './Stats.js'
import { UniqueList } from './UniqueList.js'

/**
 * Class representing a user of the app.
 */
export class User {
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
  private _stats: UserStats = new UserStats()

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
   * Initializes a new instance of the User class.
   * @param id Unique id of the user.
   * @param name Name (or nickname) of the user.
   * @param activity Activity of the user.
   */
  public constructor(id: number, name: string, activity: Activity) {
    this.id = id
    this.name = name
    this.activity = activity
  }

  /**
   * Getter for the stats.
   * @returns The stats.
   */
  public get stats(): UserStats {
    return this._stats
  }
}
