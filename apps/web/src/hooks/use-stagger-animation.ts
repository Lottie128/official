import { useEffect, useRef } from 'react'

export function useStaggerFadeIn(stagger = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const children = element.children

    if (children.length === 0) return

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
        children,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
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
  }, [stagger])

  return ref
}
