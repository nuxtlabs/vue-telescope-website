import { gsap } from 'gsap'
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { defineNuxtPlugin } from '#imports'
// gsap.registerPlugin(MorphSVGPlugin)
gsap.registerPlugin(DrawSVGPlugin)
// gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
// gsap.core.globals('ScrollTrigger', ScrollTrigger)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap,
      SplitText
    }
  }
})
