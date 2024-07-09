import './style.css'
import viteLogo from './img/vite.svg'
import { setupCounter } from './counter.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>

    <h1 id="h1"> code play</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
 
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
