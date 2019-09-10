import { TimeStampRangeFilter, TimestampRangeFilterContext } from 'app/reducers/state';
import * as LF from 'localforage';
import { extendPrototype } from 'localforage-observable';
let localforage = extendPrototype(LF);
import { TimestampRangeFilterKind } from 'app/actions';
import * as Rx from 'rxjs';

type FilterChangeEventHandlerArgs = LocalForageObservableChange & {
  kind: TimestampRangeFilterKind;
};

type FilterChangeEventHandler = (args: FilterChangeEventHandlerArgs) => void;

export class SharedEventModel {
  private _isReady: boolean;
  private _projectName: string;
  private callbacks: FilterChangeEventHandler[];

  constructor(projectName: string) {
    this._projectName = projectName;
    this.callbacks = [];
    this._isReady = false;

    localforage.ready(() => {
      this._isReady = true;
      localforage.configObservables({
        crossTabNotification: true
      });

      localforage.newObservable.factory = (subscribeFn) => Rx.Observable.create(subscribeFn);
    });
  }

  startWatching() {
    const subscribe = () => {
      const observableStart = localforage.newObservable({
        key: `${this.keyBase()}.left`,
        crossTabNotification: true,
        changeDetection: false
      });

      const observableEnd = localforage.newObservable({
        key: `${this.keyBase()}.right`,
        crossTabNotification: true,
        changeDetection: false
      });

      observableStart.subscribe({
        next: (args) => {
          for (const cb of this.callbacks) {
            cb({ ...args, kind: 'left' });
          }
        }
      });
      observableEnd.subscribe({
        next: (args) => {
          for (const cb of this.callbacks) {
            cb({ ...args, kind: 'right' });
          }
        }
      });
    };
    if (this._isReady) {
      subscribe();
    } else {
      localforage.ready(subscribe);
    }
  }

  private keyBase() {
    return `logvis.project.${this._projectName}.filter.timestamp`;
  }

  notifyFilterChanged(
    kind: TimestampRangeFilterKind,
    context: TimestampRangeFilterContext | undefined
  ): void {
    const key = `${this.keyBase()}.${kind}`;
    localforage.setItem(key, context);
  }

  subscribeFilterChange(callback: FilterChangeEventHandler) {
    this.callbacks.push(callback);
  }

  static clearAllData() {
    return localforage.clear();
  }

  async loadData(): Promise<TimeStampRangeFilter> {
    const keyleft = `${this.keyBase()}.left`;
    const keyRight = `${this.keyBase()}.right`;

    const left = await localforage.getItem<TimestampRangeFilterContext>(keyleft);
    const right = await localforage.getItem<TimestampRangeFilterContext>(keyRight);

    return { left, right };
  }
}
