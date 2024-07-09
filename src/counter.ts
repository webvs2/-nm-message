import message from "../lib/main";
export function setupCounter(element: HTMLButtonElement) {
  element.innerHTML = `click me`;
  // element.addEventListener('click', () => message(document.getElementById(`h1`)))
  // element.addEventListener('click', () => message('hello world'))
  element.addEventListener("click", () =>{
     message({
      type: "info",
      content: "✨Hello, I'm Pengpeng✨ ，I come from a place far away called the Land of No Stories.",
      durationTime: 13000,
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
