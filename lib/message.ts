import "./styles/index.scss";
import render from "./render";
import { optionType, resultType } from "./types";
import { storeSteward } from "./state";
import { className} from "./util"
import anime from 'animejs/lib/anime.es.js';
// import { animate  } from 'popmotion';
let store = new storeSteward();

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
  defaultOption = {
    type: "info",
    durationTime: 300, //ms
    postEvent: null,
    class: "",
    center:true
  };
  option = {} as optionType;
  index: number = 0;
  isContainer: boolean = false;

  constructor(){}
  setIndex(num: number) {
    this.index = num;
  }
  setAttr(option:optionType&{index:number}): resultType  {
    if (!option.content) {throw '[message] If you use the object argument form, be aware!"content" is required';}

    let id = "message_" + option.index;

      const elem = render({
        tag: "div",
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
        attr: {
          class:className(`na-box center  ${option.class} alert-${option.type} `) ,
          id: id,
        },
        // style: {
        // marginLeft:
           
        // },
      });

      return {
        dom: elem,
        id: id,
        domID: `#${id}`,
        source: option,
      } 
    }
  establish() {
    let { index, option,setAttr } = this;
    let than = this;
    this.setIndex(index + 1);
    //	 Generate and add to the body🐱‍🏍...

    let { source, dom, id} =setAttr({...option,index});
    // dom.style.marginLeft = `-${dom.offsetWidth/2}px`;

    document.body.appendChild(dom);
    dom.style.marginLeft = `-${dom.offsetWidth/2}px`;
    store.push({ source, dom });
   anime({
      targets: `#${id}`,
      top: 38,
      endDelay:50000,
      // source.durationTime+index * 5000,
      //  ()=>source.durationTime+index * 100+ (typeof option.content ==="string"?option.content.length*6:0),
      direction: 'alternate',
      // easing: 'easeInCubic',
      duration: 900,
      complete: function(anim) {
        if(anim){
        than.setIndex(than.index-1);
          document.body.removeChild(dom);
        }
      }
    });
  }
}

let Box = new MessageClass();

let message:any = (...data: any[]) => {
  Box.option = Object.assign({}, Box.defaultOption, {
    type: data[0],
    content: data[1],
  });
  Box.establish();
};
new Array("success", "warning", "info", "error").map((item:string) => {
  message[item] = (value: any) => {
    Box.option = Object.assign({}, Box.defaultOption, {
      type: item,
      content: value,
    });
    Box.establish();
  };
});
export default message
