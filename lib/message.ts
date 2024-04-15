import "./styles/index.scss";
import render from "./render";
import { optionType, resultType } from "./types";
// import { storeSteward } from "./state";
import { className} from "./util"
import anime from 'animejs/lib/anime.es.js';
// import { animate  } from 'popmotion';
// let store = new storeSteward();

//	Exposure to message objects is not recommended, and is postEvented for more powerful boxes

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
  // containerDom: HTMLElement;
  // constructor(option: optionType) {
  //   this.option = Object.assign({}, this.defaultOption, option);
  //   // this.establish();
  // }
  constructor(){}
  setIndex(num: number) {
    this.index = num;
  }
  setAttr(option:optionType&{index:number}): resultType  {
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
      });

      return {
        dom: elem,
        id: id,
        domID: `#${id}`,
        source: option,
      } 
    }
  establish() {
    let { index, option } = this;
    this.setIndex(index + 1);
    let than = this;
    // this.index++
    if (!option.content) {throw '[message] If you use the object argument form, be aware!"content" is required';}
    // let id = "message_" + index;

    //	 Generate and add to the body🐱‍🏍...
    let messageBox = MessageConstructor(option);
    let { source, dom, id} = messageBox;
    document.body.appendChild(dom);
   let node= anime({
      targets: `#${id}`,
      translateY: ()=>index * 58+20,
      endDelay:source.durationTime+index * 500,
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

let MessageBox = new MessageClass();

let message:any = (...data: any[]) => {
  MessageBox.option = Object.assign({}, MessageBox.defaultOption, {
    type: data[0],
    content: data[1],
  });
  MessageBox.establish();
};
new Array("success", "warning", "info", "error").map((item:string) => {
  message[item] = (value: any) => {
    MessageBox.option = Object.assign({}, MessageBox.defaultOption, {
      type: item,
      content: value,
    });
    MessageBox.establish();
  };
});
export default message
