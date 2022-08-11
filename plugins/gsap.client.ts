import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(DrawSVGPlugin)
gsap.registerPlugin(SplitText)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap,
      SplitText
    }
  }
})
