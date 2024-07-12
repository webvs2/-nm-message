export  type messageType = "success"| "warning"| "info"| "error";
export interface optionType {
    type: messageType;
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

