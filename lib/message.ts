import "./styles/index.scss";
import render, { isElement } from "./tool/render";
import { optionType, messageType } from "./tool/interfaces";
import { className } from "./tool/util";
import { StoreSteward } from "./tool/state";
 const store = new StoreSteward();
// 添加全局默认配置
let globalDefaultOptions: Partial<optionType> = {
  type: "info",
  durationTime: 3000, //ms
  postEvent: () => { },
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
    }));

  }
  show(option: Partial<optionType>|string) {
    let option2 = option as Partial<optionType>;
    if (typeof option === 'string') {
      option2 = { content: option };
    }
    const optionMerged = { ...globalDefaultOptions, ...option2 };
    const  { type, content, suffix } =optionMerged
    // const id = `na-box_${new Date().getTime()}`;
    const id =this.message_id +`_`+'item'+new Date().getTime();
    const isele = isElement(content);
    const dom = render({
      tag: "div",
      attr: {
        class: className(
          `na-con  enter na-box_${type} ${option.class} `
        ),
        id: id,
        style: { top: `${20 + 0 * 70}px` },
      },
      children: [
        (
          !isele ? {
            tag: "span",
            children: content,
          } : {
            tag: "div",
            attr: {
              id: `${id}_content`,
            }
          }
        ),
        (
          suffix ? {
            tag: "div",
            attr: {
              class: `na-suffix`,
            },
            on: {
              click: () => {
                option?.suffixEvent!({
                  close: () => {
                    // 使用公共方法查找项目，修复私有属性访问错误
                    const store = new StoreSteward();
                    let item = null;
                    for (const storeItem of store.values()) {
                      if (storeItem.id === id) {
                        item = storeItem;
                        break;
                      }
                    }
                    if (item) {
                      store.remove(item, true);
                    }
                  }
                });
              }
            },
            children: suffix,
          } : undefined
        )

      ].filter(item => item !== undefined) as any[],
    })
console.log('dom', id)
    document.getElementById(this.message_id)!.appendChild(dom);
  
    store.push({ ...optionMerged , dom: id, message_id: this.message_id });
   

    // store.push({ source: { ...option, type, content, suffix }, dom: dom, id: id });
    // if (isele) {
    //   document.getElementById(`${id}_content`)?.appendChild(option.content as HTMLElement)
    // }

    // 为每个容器创建独立的StoreSteward实例
    // const store = new StoreSteward();
    // store.push({ source: { ...option }, dom: dom, id: id });
  }
  // establish() {
  //   //establish
  //   return this.createContext();
  // }

  // 添加静态init方法来设置全局默认配置
  static init(options: Partial<optionType>) {
    globalDefaultOptions = { ...globalDefaultOptions, ...options };
    // 返回一个带有预配置的实例

    // return new MessageClass({});
  }
}

const init = MessageClass.init;
export type { messageType, optionType }
export { MessageClass as Message, init as init };