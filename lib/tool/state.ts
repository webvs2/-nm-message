import { isPromise } from "./util";

type BaseArgumentType =any;

interface TimeoutMap {
  [key: string]: any;
}

export class StoreSteward {
  // Use a Map instead of an array to achieve O(1) lookup performance
  private store: Map<string, BaseArgumentType> = new Map();
  private timeouts: TimeoutMap = {};
  
  push(value: BaseArgumentType) {
    this.store.set(value.dom, value);
    if (value.durationTime !== false && typeof value.durationTime === "number") {
      this.timeouts[value.dom] = this.timebomb(value);
    }
  }
  
  async remove(data: BaseArgumentType, immediate: boolean = false) {
    const {  dom,message_id } = data;
    const  vnode =document.getElementById(dom)!;
    const naBox = document.getElementById(message_id);
    if (!immediate) {
    }
    
    vnode.className = "out " + vnode.className;
    vnode.addEventListener(
      "animationend",
      function () {
          naBox!.removeChild(vnode);
      },
      { once: true } as any
    );
    // Clear the timer and delete it from the storage.
    if (this.timeouts[dom]) {
      clearTimeout(this.timeouts[dom]);
      delete this.timeouts[dom];
    }
    
    this.store.delete(dom);



  }
  
  timebomb(data: BaseArgumentType) {
    const { durationTime } = data;
    const delay = (typeof durationTime === "number" ? durationTime : 0) + this.store.size * 500;
    return setTimeout(() => {
      this.remove(data);
    }, delay);
  }
  
  removeAll() {
    for (const item of this.store.values()) {
      this.remove(item);
    }
  }
  size(): number {
    return this.store.size;
  }
  

    has(id: string): boolean {
    return this.store.has(id);
  }
  
  // Add a method for searching for projects by ID
  findById(id: string): BaseArgumentType | undefined {
    return this.store.get(id);
  }
  
  // Add a public method for obtaining all values
  values(): IterableIterator<BaseArgumentType> {
    return this.store.values();
  }
}