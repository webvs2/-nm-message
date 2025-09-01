import { isPromise } from "./util";

type BaseArgumentType =any;

interface TimeoutMap {
  [key: string]: any;
}

export class StoreSteward {
  // 使用Map代替数组以提供O(1)的查找性能
  private store: Map<string, BaseArgumentType> = new Map();
  // 使用普通对象存储timeout ID以提高性能
  private timeouts: TimeoutMap = {};
  
  push(value: BaseArgumentType) {
    // 直接使用ID作为键存储，提供O(1)访问
    this.store.set(value.id, value);
    // 使用ID作为timeout映射的键
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
    
    // 清除定时器并从存储中删除
    if (this.timeouts[id]) {
      clearTimeout(this.timeouts[id]);
      delete this.timeouts[id];
    }
    console.log('vnode',this.timeouts);
    
    // 直接通过ID删除，O(1)复杂度
    this.store.delete(id);

    // console.log('vnode',this.timeouts);


  }
  
  timebomb(data: BaseArgumentType) {
    console.log('timebomb',data);
    const { durationTime, id } = data;
    return setTimeout(() => {
      this.remove(data);
      // 清理timeout引用
    
    }, durationTime);
  }
  
  removeAll() {
    // 将forEach改为for-of循环以提高性能
    for (const item of this.store.values()) {
      this.remove(item);
    }
  }
  
  // 添加获取存储大小的方法
  size(): number {
    return this.store.size;
  }
  

    has(id: string): boolean {
    return this.store.has(id);
  }
  
  // 添加根据ID查找项目的方法
  findById(id: string): BaseArgumentType | undefined {
    return this.store.get(id);
  }
  
  // 添加获取所有值的公共方法
  values(): IterableIterator<BaseArgumentType> {
    return this.store.values();
  }
}