import './style.css'
import viteLogo from './img/vite.svg'
import { setupCounter,setupCounter1 } from './counter.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <h1 id="h1"> code play</h1>
       <p>
    This is a great message prompter, it takes up very little memory and space, but provides common usage, and from a modern front-end build, you can use it alone in the project or incorporate it into the base library, it is very useful.
    </p>
    <div class="card">
      <button id="counter-success" type="button">success</button>
      <button id="counter-warning" type="button">warning</button>
      <button id="counter-info" type="button">info</button>
      <button id="counter-error" type="button">error</button>
       

    </div>
 
  </div>
`
// <button id="close" type="button">close</button>
setupCounter(document.querySelector<HTMLButtonElement>('#counter-success')!,'success')
setupCounter(document.querySelector<HTMLButtonElement>('#counter-warning')!,'warning')
setupCounter(document.querySelector<HTMLButtonElement>('#counter-info')!,'info')
setupCounter(document.querySelector<HTMLButtonElement>('#counter-error')!,'error')

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
