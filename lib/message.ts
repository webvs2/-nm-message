import "./styles/index.scss";
import render, { isElement } from "./tool/render";
import { optionType, messageType } from "./tool/interfaces";
import { StoreSteward } from "./tool/state";
 const store = new StoreSteward();
// 添加全局默认配置
let globalDefaultOptions: Partial<optionType> = {
  type: "info",
  durationTime: 3000, //ms
  // postEvent: () => { },
  class: "",
};

class MessageClass {
  option = {} as optionType;
  message_id: string | null = null;
  constructor() {
    // 延迟创建容器到首次 show 时，以便拿到最新 container
  }

  // 获取容器元素
  getContainer() {
    if (typeof document === "undefined") return null as any;
    if (typeof this.option.container === 'string') {
      return document.querySelector(this.option.container) || document.body;
    } else if (this.option.container instanceof HTMLElement) {
      return this.option.container;
    } else {
      return document.body;
    }
  }

  createBox() {
    if (typeof document === "undefined") return;
    this.message_id = `na-box` + (Math.random().toString().slice(2, 8));
    this.getContainer()?.appendChild(render({
      tag: "div",
      attr: {
        class: `na-box`,
        id: this.message_id
      }
    })as HTMLElement);

  }
  show(option: Partial<optionType>|string) {
    if (typeof document === "undefined") {
      return { close: () => {} };
    }
    let option2 = option as Partial<optionType>;
    if (typeof option === 'string') {
      option2 = { content: option };
    }
    const optionMerged = { ...globalDefaultOptions, ...option2 } as optionType;
    this.option = optionMerged as optionType;
    if (this.message_id == null) {
      this.createBox();
    }
    const  { type, content, suffix } =optionMerged
    const id =this.message_id +`_`+'item'+new Date().getTime()+ Math.floor(Math.random()*1000);
    const boxEl = document.getElementById(this.message_id!);
    const index = boxEl ? boxEl.children.length : 0;
    const dom = render({
      tag: "div",
      attr: {
        class: 
          `na-con  enter na-box_${type} ${optionMerged.class} `
        ,
        id: id,
        style: { top: `${20 + index * 12}px` },
      },
      children: [content,
        (
          suffix ? {
            tag: "div",
            attr: {
              class: `na-suffix`,
            },
            on: {
              click: () => {
                const close = () => store.remove({ ...optionMerged , dom: id, message_id: this.message_id }, true);
                optionMerged?.suffixEvent && optionMerged.suffixEvent({ close });
              }
            },
            children: suffix,
          } : undefined
        )

      ].filter(item => item !== undefined) as any[],
    })
    document.getElementById(this.message_id!)!.appendChild(dom as HTMLElement);
    store.push({ ...optionMerged , dom: id, message_id: this.message_id });
    const close = () => store.remove({ ...optionMerged , dom: id, message_id: this.message_id }, true);
    return { close };
  }

  static init(options: Partial<optionType>) {
    globalDefaultOptions = { ...globalDefaultOptions, ...options };
  }
}

const init = MessageClass.init;
export type { messageType, optionType }
export { MessageClass as Message, init as init };