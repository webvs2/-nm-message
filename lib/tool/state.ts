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
    this.store.set(value.id, value);
    this.timeouts[value.id] = this.timebomb(value);
  }
  
  async remove(data: BaseArgumentType, immediate: boolean = false) {
    const { beforeEvent, dom, id,postEvent,message_id } = data;
    const  vnode =document.getElementById(dom)!;
    if (!immediate) {
      if (
        beforeEvent &&
        beforeEvent() &&
        isPromise(beforeEvent())
      ) {
        const result = (await beforeEvent()) as boolean;
        if (!result) return false;
      }
    }
    
    vnode.className = "out " + vnode.className;
    // console.log('vnode',vnode);
    vnode.addEventListener(
      "animationend",
      function () {
        postEvent?.();
        const naBox = document.getElementById(message_id);
          naBox!.removeChild(vnode);
      },
      false
    );
    
    // Clear the timer and delete it from the storage.
    if (this.timeouts[id]) {
      clearTimeout(this.timeouts[id]);
      delete this.timeouts[id];
    }
    console.log('vnode',this.timeouts);
    
    this.store.delete(id);



  }
  
  timebomb(data: BaseArgumentType) {
    console.log('timebomb',data);
    const { durationTime, id } = data;
    return setTimeout(() => {
      this.remove(data);
    
    }, durationTime);
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