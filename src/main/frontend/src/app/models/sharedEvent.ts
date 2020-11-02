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

/**
 * This is the class for the sharing local storage information of the filtering.
 */
export class SharedEventModel {
  private _isReady: boolean;
  private _projectName: string;
  private callbacks: FilterChangeEventHandler[];

  constructor(projectName: string) {
    this._projectName = projectName;
    this.callbacks = [];
    this._isReady = false;

    /**
     * When the user opens the files in multiples tabs, notify localforge inforamtion to all tabs.
     */
    localforage.ready(() => {
      this._isReady = true;
      localforage.configObservables({
        crossTabNotification: true
      });

      localforage.newObservable.factory = (subscribeFn) => Rx.Observable.create(subscribeFn);
    });
  }

  /**
   * This fucntion starts wathcing on each callback.
   */
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
    return `nod4j.project.${this._projectName}.filter.timestamp`;
  }

  /**
   * @param kind is the left/right filter which means the filtering start/end point.
   * @param context is the filtering point information (e.g., token name, line number).
   * This function returns the filtering information to the current filter view.
   */
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

  /**
   * This function returns the current filtering informaion recorded in localforge.
   */
  async loadData(): Promise<TimeStampRangeFilter> {
    const keyleft = `${this.keyBase()}.left`;
    const keyRight = `${this.keyBase()}.right`;

    const left = await localforage.getItem<TimestampRangeFilterContext>(keyleft);
    const right = await localforage.getItem<TimestampRangeFilterContext>(keyRight);

    return { left, right };
  }
}
