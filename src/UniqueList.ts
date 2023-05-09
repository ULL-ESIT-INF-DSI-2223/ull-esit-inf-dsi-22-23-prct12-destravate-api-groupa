/**
 * A class that stores a list of unique values.
 */
export class UniqueList<T = number> {
  /**
   * List of values.
   * @type {T[]}
   */
  private _values: T[] = []

  /**
   * Initializes the list with the given values.
   * @param values Values to be added to the list.
   */
  public constructor(...values: T[]) {
    for (const value of values) this.add(value)
  }

  /**
   * Getter for the values list.
   * @returns The values list.
   */
  public get values(): T[] {
    return this._values
  }

  /**
   * Method that checks if a value is in the list.
   * @param value Value to be checked.
   * @returns True if the value is in the list, false otherwise.
   */
  private has(value: T): boolean {
    for (const v of this._values)
      if (JSON.stringify(v) === JSON.stringify(value)) return true
    return false
  }

  /**
   * Adds a value to the list.
   * @param value Value to be added.
   * @returns True if the value was added, false otherwise.
   */
  public add(value: T): boolean {
    if (this.has(value)) return false
    this._values.push(value)
    return true
  }

  /**
   * Removes a value from the list.
   * @param value Value to be removed.
   * @returns True if the value was removed, false otherwise.
   */
  public remove(value: T): boolean {
    if (!this.has(value)) return false
    this._values = this._values.filter((v) => v !== value)
    return true
  }
}
