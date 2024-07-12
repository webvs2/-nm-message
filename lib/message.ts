import "./styles/index.scss";
import render,{isElement} from "./render";
import  { optionType,messageType } from "./types";
import { className} from "./util";
import { storeSteward } from "./state";
const store = new storeSteward();

/**
 * @description: Message
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
    let  isele =isElement(option.content);
    const dom = render({
      tag: "div",
      attr: {
        class: className(
          `na-con  enter na-box_${option.type} ${option.class} `
        ), 
        id:id
      },
      children: [
        // {
        //   tag: "i",
        //   attr: {
        //     class: `iconfont na-icon icon-${option.type}`,
        //   },
        // },
        (
          !isele? {
            tag: "span",
            children: option.content,
          }:{
            tag: "div",
            attr: {
              id: `${id}_content`,
            }
          }
        )
       
      ],
    })

    document.getElementById(`na-box`)?.appendChild(dom);
    if(isele){
      document.getElementById(`${id}_content`)?.appendChild(option.content as HTMLElement)
    }
    store.push({source:{ ...option},dom:dom,id:id});
    
  }
  establish() {
    //establish
    let { createContext } = this;
    createContext.call(this);
  }
}

/**
 * 
 * @param {messageType | Partial<optionType> | string} age
 * @returns {void}
 */
const message = (...age:(messageType|Partial<optionType>|string)[]) => {
  let option=null
  if(!!age[0]&& typeof age[0]==='string'){
    option ={
        type: (age[0] as messageType) ?? "info",
        content: age[1] ?? age[0],
      }
  }else if(typeof age[0]==='object'){
    option=age[0]
  }else{
    console.error("The first parameter must be a string or object")
  }
 new MessageClass(option as optionType).establish();

};

export type {messageType,optionType}
export default message;
