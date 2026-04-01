import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let initialized = false

export function initGSAP() {
  if (initialized) return
  initialized = true
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
  if (ScrollTrigger.isTouch === 1) {
    ScrollTrigger.normalizeScroll(true)
  }
}

export { gsap, ScrollTrigger }
