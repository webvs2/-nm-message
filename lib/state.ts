  import type{resultType} from './types'
    class storeSteward {
    store: any[] = [];
    pastDue: any[] = [];
    constructor() {
      this.store = [];
      // this.pastDue = [];
    }
    push(value:any) {
      let index = this.pastDue.length;
      this.pastDue.push(this.timebomb(value, index));
    }
    timebomb(data:resultType, index:number) {
      let { source, dom } = data;
      return setTimeout(() => {
        let { pastDue } = this;
           
        dom.className = "out " + dom.className;
        dom.addEventListener(
          "animationend",
          function () {
            source.postEvent?.();
            document.body.removeChild(dom);
          },
          false
        );
        clearTimeout(pastDue[index]);
        pastDue[index] = null;
      }, source.durationTime);
    }
    closeAll() {
      let { pastDue } = this;
      pastDue.map((item) => {
        clearTimeout(item);
        item = null;
      });
      pastDue = [];
      return new Promise((resolve, reject) => {
        if (!pastDue.length) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    }
  }
  type StateType =()=>object
  interface Store {
    [propKey: string]: any;
  }
  const createStore = (option:{ state:StateType,mutations:object} ) => {
    // let store = new storeSteward();
    // let store =option.state();
    var proxy = new Proxy(option, {
      get: function(target, propKey: string, receiver) {
        return (target.state() as Store)[propKey] ;
        // || (target.mutations as Store )[propKey];
      },
      set: function(target, propKey, value) {
        return true;
      }
    });
return proxy;    
  };
  export {createStore}