export interface optionType {
    type: string;
    durationTime: number; //ms
    class?: string;
    content: string;
    postEvent: () => void;
    center:boolean
  }
  export interface resultType  {
    dom: HTMLElement;
    id: String;
    source: optionType;
  }
  // export interface resultType {
  //   dom: HTMLElement;
  //   id: String;
  //   domID: String;
  //   source: any;
  //   [propName: string]: any;
  // }