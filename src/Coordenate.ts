/**
 * Coordenate interface.
 * It represents a point in a track, map, challenge... Is defined by a latitude and a longitude.
 * @example
 * ```typescript
 * const coord: Coordenate = {
 *  lat: 40.4167,
 *  lng: -3.70325
 * }
 */
export type Coordenate = {
  /**
   * Latitude of the coordenate.
   * @type {number}
   */
  lat: number
  /**
   * Longitude of the coordenate.
   * @type {number}
   */
  lng: number
}
