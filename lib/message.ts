import "./styles/index.scss";
import render from "./render";
import { optionType } from "./types";
import { className } from "./util";
import { storeSteward } from "./state";
const store = new storeSteward();

/**
 * @description: Message box
 * @param {string} type
 * @param {string} content
 * @param {number} durationTime
 * @param {string} class
 * @param {boolean} center
 * @return {void}
 * @example: message("success","This is a success message",3000,"",true)
 */

class MessageClass {
  option = {} as optionType;
  index: number = 0;
  isContainer: boolean = false;
  constructor(option:Partial<optionType>) {
    this.option={...{
        type: "info",
        durationTime: 3000, //ms
        postEvent:() =>{},
        class: "",
        center: true,
      },...option} as optionType
    if(!document.getElementById(`na-box`)){
      this.createBox()
    }
  }
  createBox(){
    document.body.appendChild(render({
        tag: "div",
        attr: {
          class:`na-box`,
          id: `na-box`,
        }}));
  }
  createContext() {
    const { option } = this;
    const id = `na-box_${new Date().getTime()}`;
    const dom = render({
      tag: "div",
      attr: {
        class: className(
          `na-con  enter na-box_${option.type} ${option.class} `
        ), 
        id:id
      },
      // style:`transition-duration:${option.durationTime}ms;`
      children: [
        {
          tag: "i",
          attr: {
            class: `iconfont na-icon icon-${option.type}`,
          },
        },
        {
          tag: "span",
          children: option.content,
        },
      ],
    })
    document.getElementById(`na-box`)?.appendChild(dom );
    store.push({source:{ ...option},dom:dom,id:id});
    
  }
  establish() {
    //establish
    let { createContext } = this;
    createContext.call(this);
  }
}

let message: any = (...age: any) => {
 const a= new MessageClass({
    type: age[0] ,
    content: age[1],
  })
  // console.log(a)
  a.establish();
 
};
// new Array("success", "warning", "info", "error").map((item: string) => {
//   message[item] = (value: any) => {
//     Box.option = Object.assign({}, Box.defaultOption, {
//       type: item,
//       content: value,
//     });
//     Box.establish();
//   };
// });
export default message;
