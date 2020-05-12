import MiniChatter from './components/MiniChatter.vue'

export default {
  install(Vue, args = {}) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.component('MiniChatter', MiniChatter)
  }
}

//export { MiniChatter }