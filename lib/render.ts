import { cssAttrSymbolTransition as cast} from "./util"

interface objType {
  tag: string;
  children?: any;
  attr?: any;
  on?: any;
}
type renderType = (obj: objType, root?: HTMLElement) => HTMLElement;
const cssTransition = (attr:Object) => {
  return Object.entries(attr)
    .map(([key, value]) => `${cast(key)}:${value}`)
    .join(';');
}
export const isElement= (obj:any)=> {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}
const render:renderType = (obj: objType, root?: HTMLElement) => {
  const el = document.createElement(obj.tag);
  if (!!obj.on){
    Object.keys(obj.on).map((item) => {
      el.addEventListener(item, obj.on[item]);
    })
  }
  if (!!obj.attr) {
    Object.keys(obj.attr).map((item) => {
      let property: any = null;
      if (typeof obj.attr?.[item] === "object") {
        property = cssTransition(obj.attr?.[item]);
      }
      el.setAttribute(item, property || obj.attr?.[item]);
    });
  }
  if (typeof obj.children == "string"||typeof obj.children == "number" ) {
    const text = document.createTextNode( String(obj.children));
    el.appendChild(text);
  } else if(obj.children) {
    obj.children.forEach((element:objType) => render(element, el));
  }
  return root ? root.appendChild(el) : el;
};


export default render;
