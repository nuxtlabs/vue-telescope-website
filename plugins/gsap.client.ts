import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { defineNuxtPlugin } from '#imports'
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
