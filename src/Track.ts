import { Coordenate } from './Coordenate.js'
import { Activity } from './Activity.js'

/**
 * Track class.
 * A track is a route that a user can do. It is defined by:
 *  - An unique id.
 *  - A name.
 *  - A start and end point, with a distance and a slope.
 *  - A list of users that have done the track.
 *  - An activity to do in the track.
 *  - A score.
 */
export class Track {
  /**
   * Unique id of the track.
   * @type {number}
   */
  readonly id: number
  /**
   * Name of the track.
   * @type {string}
   */
  public name: string
  /**
   * Start point of the track.
   * @type {Coordenate}
   */
  public start: Coordenate
  /**
   * End point of the track.
   * @type {Coordenate}
   */
  public end: Coordenate
  /**
   * Distance of the track.
   * @type {number}
   */
  public distance: number
  /**
   * Average slope of the track.
   * @type {number}
   */
  public slope: number
  /**
   * List of users that have done the track.
   * @type {number[]}
   */
  public users_log: number[]
  /**
   * Activity to do in the track.
   * @type {Activity}
   */
  public activity: Activity
  /**
   * Score result of the users reviews.
   * @type {number}
   */
  public score: number

  /**
   * Initializes a track.
   * @param id Id of the track.
   * @param name Name of the track.
   * @param start Start point of the track.
   * @param end End point of the track.
   * @param distance Distance of the track.
   * @param slope Average slope of the track.
   * @param users_log Users that have done the track.
   * @param activity Activity to do in the track.
   * @param score Score result of the users reviews.
   */
  public constructor(
    id: number,
    name: string,
    start: Coordenate,
    end: Coordenate,
    distance: number,
    slope: number,
    users_log: number[],
    activity: Activity,
    score: number
  ) {
    this.id = id
    this.name = name
    this.start = start
    this.end = end
    this.distance = distance
    this.slope = slope
    this.users_log = users_log
    this.activity = activity
    this.score = score
  }
}
