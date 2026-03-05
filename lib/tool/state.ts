import { isPromise } from "./util";

type BaseArgumentType = any;

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
    const { dom, message_id } = data;
    const vnode = document.getElementById(dom);
    const naBox = document.getElementById(message_id);
    if (!vnode || !naBox) return;

    if (this.timeouts[dom]) {
      clearTimeout(this.timeouts[dom]);
      delete this.timeouts[dom];
    }

    if (immediate) {
      naBox.removeChild(vnode);
      this.store.delete(dom);
      this.updateMessagePositions(message_id);
      return;
    }

    vnode.classList.remove("enter");
    vnode.classList.add("out");

    vnode.addEventListener(
      "animationend",
      () => {
        if (naBox.contains(vnode)) {
          naBox.removeChild(vnode);
        }
        this.store.delete(dom);
        this.updateMessagePositions(message_id);
      },
      { once: true } as any
    );
  }

  updateMessagePositions(messageId: string) {
    const naBox = document.getElementById(messageId);
    if (!naBox) return;

    const children = Array.from(naBox.children) as HTMLElement[];
    children.forEach((child, index) => {
      child.style.top = `${20 + index * 42}px`;
    });
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