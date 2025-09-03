import {Message} from "../lib/index";
// import { messageType } from './../lib/message';
const  message= new Message();
export function setupCounter(element: HTMLButtonElement,type:any) {
  const sss = document.createElement('span');
  sss.innerHTML = "0";
  element.addEventListener("click", () =>{
    message.show({
      type: 'success',
      content: 'sss',
      durationTime: 3000,
      suffix:'close',
      suffixEvent:()=>{console.log('close')}
  })
  })

    // message.show({
    //   type: 'success',
    //   content: "✨Hello, world✨ ，I come from a place far away called the Land of No Stories.",
    //   durationTime: 3000,
    //   suffix:'close',
    //   })
      
    
// message.show("✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.")
    // message({
    //   type: type,
    //   content: "✨Hello, world✨ ，I come from a place far away called the Land of No Stories.",
    //   durationTime: 3000,
    //   suffix:'close',
    //   // beforeEvent:()=>{
    //   //   console.log('close','我要停下来')
    //   //    return new Promise((resolve, reject) => {
    //   //   resolve(false);
    //   //   });
    //   // }
    // });
    // message({
    //   type: "success",
    //   content: "I'm a front-end developer, and I'm here to help you with your project.",
    //   postEvent:()=>{
    //     message('谢谢')
    //   }
    // })
  }

// message({
//   type: "success",
//   content: "✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.",
//   durationTime: 113000,
// });
// export function setupCounter1(element: HTMLButtonElement) {
//   element.addEventListener("click", () =>{
//     console.log('close',message)
//     // message.closeAll()
//   }
   
//   );

// }