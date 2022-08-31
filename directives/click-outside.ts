const HANDLER = 'click_outside'

function bind (el, binding) {
  unbind(el)
  const callback = binding.value
  if (typeof callback !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'v-' +
          binding.name +
          '="' +
          binding.expression +
          '" expects a function value, ' +
          'got ' +
          callback
      )
    }
    return
  }
  let initialMacrotaskEnded = false
  setTimeout(function () {
    initialMacrotaskEnded = true
  }, 0)
  el[HANDLER] = (event) => {
    const path =
      event.path || (event.composedPath ? event.composedPath() : undefined)

    if (
      initialMacrotaskEnded &&
      (path ? !path.includes(el) : !el.contains(event.target))
    ) {
      return callback()
    }
  }
  document.documentElement.addEventListener('click', el[HANDLER], false)
}

function unbind (el) {
  document.documentElement.removeEventListener('click', el[HANDLER], false)
  delete el[HANDLER]
}

export default {
  created (el, binding) {
    bind(el, binding)
  },
  updated (el, binding) {
    if (binding.value === binding.oldValue) { return }
    bind(el, binding)
  },
  beforeUnmount (el) {
    unbind(el)
  }
}
