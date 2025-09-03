import { cssAttrSymbolTransition as cast} from "./util"

interface EventHandler {
  [eventName: string]: EventListener;
}

interface ObjType {
  tag: string;
  children?: string | number | ObjType[];
  attr?: {
    [key: string]: string | number | boolean | object;
  };
  on?: EventHandler;
}

type RenderType = (obj: ObjType, root?: HTMLElement) => HTMLElement|false;

const cssTransition = (attr: Record<string, string | number | boolean>): string => {
  return Object.entries(attr)
    .map(([key, value]) => `${cast(key)}:${value}`)
    .join(';');
}

export const isElement = (obj: unknown): obj is HTMLElement => {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch(_e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj !== null) &&
      (obj as HTMLElement).nodeType === 1 && 
      typeof (obj as HTMLElement).style === "object" &&
      typeof (obj as HTMLElement).ownerDocument === "object";
  }
}

const render: RenderType = (obj: ObjType, root?: HTMLElement) => {
  if(isElement(obj) ) {
    return root ? root.appendChild(obj) : obj;
  }
  if(typeof obj === "string" || typeof obj === "number"){
     root!.appendChild(document.createTextNode(String(obj)))
    return false;
  }
  const el = document.createElement(obj.tag);
  if (obj.on){
    Object.keys(obj.on).map((item) => {
      el.addEventListener(item, obj.on![item]);
    })
  }
  if (obj.attr) {
    Object.keys(obj.attr).map((item) => {
      let property: string | null = null;
      if (typeof obj.attr?.[item] === "object") {
        property = cssTransition(obj.attr[item] as Record<string, string | number | boolean>);
      }
      el.setAttribute(item, property || String(obj.attr?.[item]));
    });
  }
  if (typeof obj.children == "string"||typeof obj.children == "number" ) {
    const text = document.createTextNode( String(obj.children));
    el.appendChild(text);
  } else if(obj.children) {
    (obj.children as ObjType[]).forEach((element: ObjType) => render(element, el));
  }
  return root ? root.appendChild(el) : el;
};

export default render;