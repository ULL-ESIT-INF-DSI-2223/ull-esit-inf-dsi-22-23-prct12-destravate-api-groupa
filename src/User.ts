import { Activity } from './Activity.js'
import { UserStats } from './Stats.js'

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
   * @type {number[]}
   */
  private _friends: number[] = []

  /**
   * List of groups of the user.
   * @type {number[]}
   */
  private _groups: number[] = []

  /**
   * Stats of the user.
   * @type {UserStats}
   */
  private _stats: UserStats = new UserStats()

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
   * Getter for the friends list.
   * @returns The friends list.
   * @readonly
   */
  public get friends(): number[] {
    return this._friends
  }

  /**
   * Getter for the groups list.
   * @returns The groups list.
   * @readonly
   */
  public get groups(): number[] {
    return this._groups
  }

  /**
   * Getter for the stats.
   * @returns The stats.
   */
  public get stats(): UserStats {
    return this._stats
  }

  /**
   * Method to add an user id to the friends list.
   * @param friend Id of the user to add.
   * @returns True if the user was added, false otherwise.
   */
  public addFriend(friend: number): boolean {
    if (this._friends.includes(friend)) return false
    this._friends.push(friend)
    return true
  }

  /**
   * Method to remove an user id from the friends list.
   * @param friend Id of the user to remove.
   * @returns True if the user was removed, false otherwise.
   */
  public removeFriend(friend: number): boolean {
    if (!this._friends.includes(friend)) return false
    this._friends.splice(this._friends.indexOf(friend), 1)
    return true
  }

  /**
   * Method to add a group id to the groups list.
   * @param group Id of the group to add.
   * @returns True if the group was added, false otherwise.
   */
  public addGroup(group: number): boolean {
    if (this._groups.includes(group)) return false
    this._groups.push(group)
    return true
  }

  /**
   * Method to remove a group id from the groups list.
   * @param group Id of the group to remove.
   * @returns True if the group was removed, false otherwise.
   */
  public removeGroup(group: number): boolean {
    if (!this._groups.includes(group)) return false
    this._groups.splice(this._groups.indexOf(group), 1)
    return true
  }
}
