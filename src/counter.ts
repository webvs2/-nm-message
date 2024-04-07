
 import {message} from '../lib/main'
export function setupCounter(element: HTMLButtonElement) {
  // let counter = 0
  // const setCounter = (count: number) => {
  //   counter = count
    element.innerHTML = `click me`
  // }
  element.addEventListener('click', () => message('error', 'hello world'))
  // setCounter(0)
}
