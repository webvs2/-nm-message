import type { resultType, optionType } from "./types";
import { isPromise } from "./util";
import {out} from './css'
import { cx} from '@emotion/css'

type baseArgumentType ={ source: optionType; dom: HTMLElement; id: string }
export class storeSteward {
  store: baseArgumentType[] = [];
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
    const { source, dom } = data;
    const { pastDue, store } = this;
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
      dom.className =cx( dom.className,out) 
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
    if(source.durationTime){
      return setTimeout(() => {
        this.remove(data);
      }, (source.durationTime as number) + store.length * 1000);
    }
  }
  removeAll() {
    this.store.map((item) => {
      this.remove(item);
    });
  }
}
