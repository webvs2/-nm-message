export interface optionType {
    type: string;
    durationTime: number; //ms
    class?: string;
    content: string|HTMLElement;
    postEvent: () => void;
    center:boolean
  }
  export interface resultType  {
    dom: HTMLElement;
    id: String;
    source: optionType;
  }
  // "success", "warning", "info", "error"
  export  type messageType = "success"| "warning"| "info"| "error";
  // export interface resultType {
  //   dom: HTMLElement;
  //   id: String;
  //   domID: String;
  //   source: any;
  //   [propName: string]: any;
  // }