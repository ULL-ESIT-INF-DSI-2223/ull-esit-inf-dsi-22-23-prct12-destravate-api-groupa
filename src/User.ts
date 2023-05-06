import { Activity } from './Activity'

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
   * Initializes a new instance of the User class.
   * @param id Unique id of the user.
   * @param name Name (or nickname) of the user.
   * @param activity Activity of the user.
   */
  constructor(id: number, name: string, activity: Activity) {
    this.id = id
    this.name = name
    this.activity = activity
  }
}
