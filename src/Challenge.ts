import { Activity } from './Activity.js'
import { UniqueList } from './UniqueList.js'
import { Track } from './Track.js'

/**
 * Interface representing a challenge of the app.
 */
export interface ChallengeInterface {
  id: number
  name: string
  activity: Activity
  tracks: UniqueList
  users: UniqueList
}

/**
 * Class representing a challenge of the app.
 */
export class Challenge implements ChallengeInterface {
  /**
   * Unique id of the challenge.
   * @type {number}
   */
  public readonly id: number

  /**
   * Name of the challenge.
   * @type {string}
   */
  public name: string

  /**
   * Activity of the challenge.
   * @type {Activity}
   */
  public activity: Activity

  /**
   * List of tracks of the challenge.
   * @type {UniqueList}
   */
  public tracks: UniqueList = new UniqueList()

  /**
   * List of users of the challenge.
   * @type {UniqueList}
   */
  public users: UniqueList = new UniqueList()

  /**
   * Initializes a new instance of the Challenge class.
   * @param id Id of the challenge.
   * @param name Name of the challenge.
   * @param tracks Tracks that compose the challenge.
   */
  constructor(id, name, activity, ...tracks) {
    this.id = id
    this.name = name
    this.activity = activity
    for (const track of tracks) this.tracks.add(track)
  }
}
