import { useEffect, useRef } from 'react'

export function useHoverLift() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let gsapModule: (typeof import('gsap'))['default'] | null = null
    let isDisposed = false

    const ensureGsap = async () => {
      if (!gsapModule) {
        const { default: gsap } = await import('gsap')
        if (isDisposed) return null
        gsapModule = gsap
      }
      return gsapModule
    }

    const handleMouseEnter = () => {
      void ensureGsap().then((gsap) => {
        if (!gsap) return
        gsap.to(element, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    }

    const handleMouseLeave = () => {
      void ensureGsap().then((gsap) => {
        if (!gsap) return
        gsap.to(element, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      isDisposed = true
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return ref
}
