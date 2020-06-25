// import Vue from 'vue'
// import { gsap } from 'gsap'

// gsap.registerPlugin(ScrollTrigger)
// gsap.core.globals('ScrollTrigger', ScrollTrigger)

// Vue.prototype.$gsap = gsap

import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
// gsap.core.globals('ScrollTrigger', ScrollTrigger)

export default ({ app }, inject) => {
  inject('gsap', gsap)
  inject('SplitText', SplitText)
}
