import "./styles/index.scss";
import render from "./render";
import { optionType } from "./types";
import { className } from "./util";
import { storeSteward } from "./state";
// import anime from 'animejs/lib/anime.es.js';
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
        durationTime: 1000, //ms
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
  setIndex(num: number) {
    this.index = num;
  }
  establish() {
    //建立
    let { createContext } = this;
    createContext.call(this);
    // let than = this;
    // this.setIndex(index + 1);
    // //	 Generate and add to the body🐱‍🏍...

    // let { source, dom, id } = setAttr({ ...option, index });
    // // dom.style.marginLeft = `-${dom.offsetWidth/2}px`;
    // // console.log('dom',dom)
    // dom.setAttribute("style", `top:${38 + index * 50}px`);
    // document.body.appendChild(dom);

    // dom.style.marginLeft = `-${dom.offsetWidth/2}px`;
    // store.push({ source, dom });
    //  anime({
    //     targets: `#${id}`,
    //     top: 38,
    //     endDelay:50000,
    //     // source.durationTime+index * 5000,
    //     //  ()=>source.durationTime+index * 100+ (typeof option.content ==="string"?option.content.length*6:0),
    //     direction: 'alternate',
    //     // easing: 'easeInCubic',
    //     duration: 900,
    //     complete: function(anim) {
    //       if(anim){
    //       than.setIndex(than.index-1);
    //         document.body.removeChild(dom);
    //       }
    //     }
    //   });
  }
}

// let Box = new MessageClass();

let message: any = (...age: string[]) => {
 const a= new MessageClass({
    type: age[0],
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
