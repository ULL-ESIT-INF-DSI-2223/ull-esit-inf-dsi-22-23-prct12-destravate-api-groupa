/**
 * A class that stores a list of unique numbers.
 */
export class UniqueList {
  /**
   * List of values.
   * @type {number[]}
   */
  private _values: number[] = []

  /**
   * Getter for the values list.
   * @returns The values list.
   */
  public get values(): number[] {
    return this._values
  }

  /**
   * Adds a value to the list.
   * @param value Value to be added.
   * @returns True if the value was added, false otherwise.
   */
  public add(value: number): boolean {
    if (this._values.includes(value)) return false
    this._values.push(value)
    return true
  }

  /**
   * Removes a value from the list.
   * @param value Value to be removed.
   * @returns True if the value was removed, false otherwise.
   */
  public remove(value: number): boolean {
    if (!this._values.includes(value)) return false
    this._values.splice(this._values.indexOf(value), 1)
    return true
  }
}
