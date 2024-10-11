import render, { isElement } from "./render";
import { optionType, messageType } from "./types";
import { storeSteward } from "./state";
import { naBox, naCon, warning, error, success, info, enter } from "./css";
import { cx } from "@emotion/css";

const store = new storeSteward();
class MessageClass {
  BoxID = `na-box`;
  option = {} as optionType;
  constructor(option: Partial<optionType>) {
    this.option = {
      ...{
        type: "info",
        durationTime: 3000, //ms
        postEvent: () => {},
        class: "",
      },
      ...option,
    } as optionType;
    if (!document.getElementById(`na-box`)) {
      this.createBox();
    }
  }
  createBox() {
    document.body.appendChild(
      render({
        tag: "div",
        attr: {
          class: cx(naBox, this.BoxID),
          id: this.BoxID,
        },
      })
    );
  }
  createContext() {
    const { option } = this;
    const { type, content, suffix } = option;
    const id = `na-box_${new Date().getTime()}`;
    const isele = isElement(content);
    const dom = render({
      tag: "div",
      attr: {
        class: cx(
          naCon,
          enter,
          option.class,
          {
            [info]: type === "info",
            [success]: type === "success",
            [error]: type === "error",
            [warning]: type === "warning",
          },
          `na-con`
        ),
        id: id,
      },
      children: [
        // {
        //   tag: "i",
        //   attr: {
        //     class: `iconfont na-icon icon-${option.type}`,
        //   },
        // },
        !isele
          ? {
              tag: "span",
              children: content,
            }
          : {
              tag: "div",
              attr: {
                id: `${id}_content`,
              },
            },
        suffix
          ? {
              tag: "div",
              attr: {
                class: `na-suffix`,
              },
              on: {
                click: () => {
                  option?.suffixEvent!({
                    close: () => {
                      store.remove(
                        store.store.filter((item) => item.id === id)[0],
                        true
                      );
                    },
                  });
                },
              },
              children: suffix,
            }
          : "",
      ],
    });

    document.getElementById(this.BoxID)?.appendChild(dom);
    if (isele) {
      document
        .getElementById(`${id}_content`)
        ?.appendChild(option.content as HTMLElement);
    }
    store.push({ source: { ...option }, dom: dom, id: id });
  }
  establish() {
    //establish
    const { createContext } = this;
    createContext.call(this);
  }
}

/**
 * @param {messageType | Partial<optionType> | string} age
 * @returns {void}
 */
const message = (...age: (messageType | Partial<optionType> | string)[]) => {
  let option = null;
  if (!!age[0] && typeof age[0] === "string") {
    option = {
      type: (age[0] as messageType) ?? "info",
      content: age[1] ?? age[0],
    };
  } else if (typeof age[0] === "object") {
    option = age[0];
  } else {
    console.error("The first parameter must be a string or object");
  }
  new MessageClass(option as optionType).establish();
};

export type { messageType, optionType };
export default message;
