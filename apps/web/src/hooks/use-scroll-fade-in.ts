import { useEffect, useRef } from 'react'

export function useScrollFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    let isDisposed = false
    let cleanup = () => {}

    const initAnimation = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (isDisposed) return

      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      cleanup = () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === element) {
            trigger.kill()
          }
        })
      }
    }

    void initAnimation()

    return () => {
      isDisposed = true
      cleanup()
    }
  }, [delay])

  return ref
}
