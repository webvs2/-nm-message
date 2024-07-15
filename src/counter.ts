import message from "../lib/main";
export function setupCounter(element: HTMLButtonElement) {
  element.innerHTML = `click me`;
  // element.addEventListener('click', () => message(document.getElementById(`h1`)))
  // element.addEventListener('click', () => message('hello world'))
  element.addEventListener("click", () =>{
// message("✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.")
     message({
      type: "success",
      content: "✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.",
      durationTime: 5000,
      suffix:'close',
      suffixEvent:({close})=>{
        close()
        // message.closeAll()
      },
      // beforeEvent:()=>{
      //   console.log('close','我要停下来')
      //    return new Promise((resolve, reject) => {
      //   resolve(false);
      //   });
      // }
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