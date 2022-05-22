import { tw, setup } from 'twind'
import { createElement } from 'react'

import domElements from './domElements'

function isFunction(functionToCheck) {
  // https://stackoverflow.com/a/7356528
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

function createTagFunction(tag) {
  return function (...args) {
    return ({ children, ...props }) => {
      // If we got a callback, give it our props
      const twArgs = isFunction(args[0]) ? args[0](props) : args
      return createElement(tag, { className: tw(twArgs), ...props }, children)
    }
  }
}

domElements.forEach((tag) => (tw[tag] = createTagFunction(tag)))

export { tw, setup }
