import message from "../lib/main";
import { messageType } from './../lib/message';
export function setupCounter(element: HTMLButtonElement,type:messageType) {
  element.addEventListener("click", () =>{
// message("✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.")
    message({
      type: type,
      content: "✨Hello, world✨ ，I come from a place far away called the Land of No Stories.",
      durationTime: false,
      suffix:'😁😀',
      suffixEvent:({close})=>{
        console.log('close','我要停下来',close())
        //  return new Promise((resolve, reject) => {
        // resolve(false);
        //   });
      }
    });
    // message({
    //   type: "success",
    //   content: "I'm a front-end developer, and I'm here to help you with your project.",
    //   postEvent:()=>{
    //     message('谢谢')
    //   }
    // })
  }
   
  );
}
// message({
//   type: "success",
//   content: "✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.",
//   durationTime: 113000,
// });
export function setupCounter1(element: HTMLButtonElement) {
  element.addEventListener("click", () =>{
    console.log('close',message)
    // message.closeAll()
  }
   
  );

}