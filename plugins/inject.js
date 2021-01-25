import mitt from 'mitt'

const emitter = mitt()

export default ({ app, store }, inject) => {
  inject('emitter', emitter)
}
