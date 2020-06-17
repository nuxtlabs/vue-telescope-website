// import Vue from 'vue'
// import { gsap } from 'gsap'

// gsap.registerPlugin(ScrollTrigger)
// gsap.core.globals('ScrollTrigger', ScrollTrigger)

// Vue.prototype.$gsap = gsap

import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(ScrollTrigger)
// gsap.core.globals('ScrollTrigger', ScrollTrigger)

export default ({ app }, inject) => {
  inject('gsap', gsap)
}
