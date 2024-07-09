
 import {message} from '../lib/main'
export function setupCounter(element: HTMLButtonElement) {

    element.innerHTML = `click me`

  element.addEventListener('click', () => message('error', 'hello world'))
}
// message('error', 'hello world')