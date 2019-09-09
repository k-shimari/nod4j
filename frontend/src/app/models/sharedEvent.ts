import { TimestampRangeFilterContext } from 'app/reducers/state';
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
  private callbacks: FilterChangeEventHandler[];

  constructor() {
    localforage.ready(() => {
      localforage.configObservables({
        crossTabNotification: true
      });

      localforage.newObservable.factory = (subscribeFn) => Rx.Observable.create(subscribeFn);

      const observableStart = localforage.newObservable({
        key: 'logvis.filter.timestamp.left',
        crossTabNotification: true,
        changeDetection: false
      });

      const observableEnd = localforage.newObservable({
        key: 'logvis.filter.timestamp.right',
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
    });

    this.callbacks = [];
  }

  notifyFilterChanged(
    kind: TimestampRangeFilterKind,
    context: TimestampRangeFilterContext | undefined
  ): void {
    const key = 'logvis.filter.timestamp.' + kind;
    localforage.setItem(key, context);
  }

  subscribeFilterChange(callback: FilterChangeEventHandler) {
    this.callbacks.push(callback);
  }

  clearAllData() {
    return localforage.clear();
  }
}
