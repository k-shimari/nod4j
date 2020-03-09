import { ValueListItemData } from 'app/components/organisms/valueList';
import { TimeStampRangeFilter, TimestampRangeFilterContext } from 'app/reducers/state';

type VarValueDataInner = { [varId: string]: ValueListItemData[] | undefined };

export class VarValueData {
  private _data: VarValueDataInner;

  constructor(data: VarValueDataInner) {
    this._data = data;
  }

  find(varId: string): ValueListItemData[] | undefined {
    return this._data[varId];
  }

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
