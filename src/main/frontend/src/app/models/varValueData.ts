import { ValueListItemData } from 'app/components/organisms/valueList';
import { TimeStampRangeFilter, TimestampRangeFilterContext } from 'app/reducers/state';

/**
 * array with index refers the its contents (values, timestamps..)
 */
type VarValueDataInner = { [varId: string]: ValueListItemData[] | undefined };

export class VarValueData {
  private _data: VarValueDataInner;

  /**
   * @param data is values, timestamps and thread ID of the specified variable
   */
  constructor(data: VarValueDataInner) {
    this._data = data;
  }

  /**
   * find the data of variable specified by id
   */
  find(varId: string): ValueListItemData[] | undefined {
    return this._data[varId];
  }

  /**
   * @param range is filtering interval from the start point (left) to end point (right)
   * This function returns the filtering result of the values for each variable
   */
  filterByRange(range: TimeStampRangeFilter): VarValueData {
    const dataCopied = Object.assign({}, this._data);
    const { left, right } = range;

    for (const key of Object.keys(dataCopied)) {
      const value = dataCopied[key];
      if (value) {
        const filtered = value.filter((x) => this.isInRange(x.timestamp, left, right));
        dataCopied[key] = filtered.length > 0 ? filtered : undefined;
      }
    }
    return new VarValueData(dataCopied);
  }

  /**
   * @param value is the value of variable
   * @param left is the start point of the filtering
   * @param right is the end point of the filtering
   * This function returns the flag of whether the value is in the range out of the filtering
   */
  isInRange(
    value: string,
    left?: TimestampRangeFilterContext,
    right?: TimestampRangeFilterContext
  ): boolean {
    const valueAsNum = Number(value);
    const leftThreshold = left ? Number(left.timestamp) : Number.MIN_SAFE_INTEGER;
    const rightThreshold = right ? Number(right.timestamp) : Number.MAX_SAFE_INTEGER;

    const result = valueAsNum >= leftThreshold && valueAsNum <= rightThreshold;
    return result;
  }
}
