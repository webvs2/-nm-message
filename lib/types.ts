export  type messageType = "success"| "warning"| "info"| "error";
export interface optionType {
    type: messageType;
    durationTime: number; //ms
    class?: string;
    suffix?:string|HTMLElement;
    suffixEvent?:(data:{close:()=>void})=>any;
    content: string|HTMLElement;
    beforeEvent?: () => void | Promise<boolean>;
    postEvent: () => void | Promise<boolean>;
  }

   

  export interface resultType  {
    dom: HTMLElement;
    id: string;
    source: optionType;
  }

