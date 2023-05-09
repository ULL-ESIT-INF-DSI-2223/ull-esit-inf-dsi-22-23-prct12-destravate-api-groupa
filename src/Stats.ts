/**
 * Definition of the Stats type used in the application.
 * A stat is a pair of km and slope, it can be daily, weekly, monthly...
 */
export type Stat = {
  /**
   * Kilometers of the stat.
   * @type {number}
   */
  km: number

  /**
   * Slope of the stat.
   * @type {number}
   */
  slope: number
}

/**
 * Definition of the Stats class used in the application.
 * This class represents the common stats between users and groups.
 */
export abstract class Stats {
  /**
   * List of stats.
   * @type {{ [key: string]: Stat }}
   */
  public values: { [key: string]: Stat }

  /**
   * Initializes a new instance of the Stats class.
   */
  public constructor() {
    this.values = {}
  }

  /**
   * Resets the stats.
   * @returns {void}
   */
  public reset(): void {
    for (const key in this.values) {
      this.values[key].km = 0
      this.values[key].slope = 0
    }
  }
}

/**
 * Definition of the UserStats class used in the application.
 * This class represents the stats of a user.
 */
export class UserStats extends Stats {
  public constructor() {
    super()
    this.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }
}

/**
 * Definition of the GroupStats class used in the application.
 * This class represents the stats of a group.
 */
export class GroupStats extends Stats {
  public constructor() {
    super()
    this.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }
}
