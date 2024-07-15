import type { resultType, optionType } from "./types";
import { isPromise } from "./util";
type baseArgumentType ={ source: optionType; dom: HTMLElement; id: String }
export class storeSteward {
  store: any[] = [];
  pastDue: any = null;
  constructor() {
    this.store = [];
    this.pastDue = new WeakMap();
  }
  push(value: baseArgumentType) {
    this.store.push(value);
    const newObj = { ...value, store_index: this.store.length };
    this.pastDue.set(value.source, this.timebomb(newObj));
  }
  async remove(data: baseArgumentType, immediate: boolean = false) {
    let { source, dom } = data;
    let { pastDue, store } = this;
    if (!immediate) {
      if (
        source.beforeEvent &&
        source.beforeEvent() &&
        isPromise(source.beforeEvent())
      ) {
        const result = (await source.beforeEvent()) as boolean;
        if (!result) return false;
      }
    }
      dom.className = "out " + dom.className;
      dom.addEventListener(
        "animationend",
        function () {
          source.postEvent?.();
          document.getElementById(`na-box`)?.removeChild(dom);
        },
        false
      );
   
    clearTimeout(pastDue.get(source));
    pastDue.set(source, null);
    pastDue.delete(source);
    store.splice(
      store.findIndex((item) => item.id === data.id),
      1
    );
  }
  timebomb(data: resultType) {
    const { store } = this;
    const { source } = data;
    return setTimeout(() => {
      this.remove(data);
    }, source.durationTime + store.length * 300);
  }
  removeAll() {
    this.store.map((item) => {
      this.remove(item);
    });
  }
}
