/*
*
* Debounced access to localstorage via $storage
*
* */

import {debounce} from "debounce";

const DEBOUNCE_TIMER = 200;

const keys = {}

function setItemWrapper(key, value) {
  if (process.client) {
    if (!(key in keys)) {
      keys[key] = debounce((v) => {
        localStorage.setItem(key, JSON.stringify(v))
      }, DEBOUNCE_TIMER);
    }
    keys[key](value)
  }
}

function getItemWrapper(key) {
  if (process.client) {
    const content = localStorage.getItem(key);
    return content === null ? null : JSON.parse(content);
  }
  return null
}


// Debounces writes to localstorage. Successive calls to write localstorage


export default ({app}, inject) => {
  inject('toStorage', setItemWrapper);
  inject('fromStorage', getItemWrapper);
};
