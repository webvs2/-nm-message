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
  message_id: any = null;
  constructor() {
    if (this.message_id == null) {
      this.createBox()
    }

  }

  // 获取容器元素
  getContainer() {
    if (typeof this.option.container === 'string') {
      return document.querySelector(this.option.container) || document.body;
    } else if (this.option.container instanceof HTMLElement) {
      return this.option.container;
    } else {
      return document.body;
    }
  }

  createBox() {
    this.message_id = `na-box` + (Math.random().toString().slice(2, 8));
    this.getContainer().appendChild(render({
      tag: "div",
      attr: {
        class: `na-box`,
        id: this.message_id
      }
    })as HTMLElement);

  }
  show(option: Partial<optionType>|string) {
    let option2 = option as Partial<optionType>;
    if (typeof option === 'string') {
      option2 = { content: option };
    }
    const optionMerged = { ...globalDefaultOptions, ...option2 } as optionType;
    const  { type, content, suffix } =optionMerged
    const id =this.message_id +`_`+'item'+new Date().getTime()+ Math.floor(Math.random()*1000);
    const isele = isElement(content);
    const dom = render({
      tag: "div",
      attr: {
        class: 
          `na-con  enter na-box_${type} ${optionMerged.class} `
        ,
        id: id,
        style: { top: `${20 + 0 * 20}px` },
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
                optionMerged?.suffixEvent!(optionMerged);
              }
            },
            children: suffix,
          } : undefined
        )

      ].filter(item => item !== undefined) as any[],
    })
    document.getElementById(this.message_id)!.appendChild(dom as HTMLElement);
    store.push({ ...optionMerged , dom: id, message_id: this.message_id });
  }

  static init(options: Partial<optionType>) {
    globalDefaultOptions = { ...globalDefaultOptions, ...options };
  }
}

const init = MessageClass.init;
export type { messageType, optionType }
export { MessageClass as Message, init as init };