export  type messageType = "success"| "warning"| "info"| "error";
export interface optionType {
    type: messageType;
    durationTime: number|boolean; //ms
    class?: string;
    suffix?:string|HTMLElement;
    suffixEvent?:(ctx: { close: () => void })=>void;
    content: string|HTMLElement;
    // beforeEvent?: () => void | Promise<boolean>;
    // postEvent: () => void | Promise<boolean>;
     container?: string | HTMLElement;
  }

   

  export interface resultType  {
    dom: HTMLElement;
    id: string;
    source: optionType;
  }

