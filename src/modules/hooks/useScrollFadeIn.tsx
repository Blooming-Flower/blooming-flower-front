import { useRef, useEffect, useCallback } from 'react'


const useScrollFadeIn = (direction:string = 'up', duration:number = 1, delay:number = 0) => {
    const element = useRef()

    const handleDirection = (name: string) => {
        switch (name) {
            case 'up':
                return 'translate3d(0, 50%, 0)'
            case 'down':
                return 'translate3d(0, -50%, 0)'
            case 'left':
                return 'translate3d(50%, 0, 0)'
            case 'right':
                return 'translate3d(-50%, 0, 0)'
            default:
                return
        }
    }

    const onScroll = useCallback(
        ([entry]: { isIntersecting: boolean }[]) => {
            const {current}:any = element
            if (entry.isIntersecting) {
                current.style.transitionProperty = 'all'
                current.style.transitionDuration = `${duration}s`
                current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)'
                current.style.transitionDelay = `${delay}s`
                current.style.opacity = 1
                current.style.transform = 'translate3d(0, 0, 0)'
            }
        },
        [delay, duration],
    )

    useEffect(() => {
        let observer: IntersectionObserver

        if (element.current) {
            observer = new IntersectionObserver(onScroll, { threshold: 1.0 })
            observer.observe(element.current)
        }

        return () => observer && observer.disconnect()
    }, [onScroll])

    return {
        ref: element,
        style: { opacity: 0, transform: handleDirection(direction) },
    }
}

export default useScrollFadeIn