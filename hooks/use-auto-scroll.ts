"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface UseAutoScrollOptions {
  speed?: number
  pauseOnHover?: boolean
  pauseDuration?: number
}

export function useAutoScroll(ref: React.RefObject<HTMLElement>, options: UseAutoScrollOptions = {}) {
  const { speed = 0.5, pauseOnHover = true, pauseDuration = 1000 } = options

  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down")
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number | null>(null)
  const speedRef = useRef(speed)

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let lastTimestamp = 0
    const scrollStep = (timestamp: number) => {
      if (!element) return

      if (isPaused) {
        animationRef.current = requestAnimationFrame(scrollStep)
        return
      }

      if (timestamp - lastTimestamp < 16) {
        animationRef.current = requestAnimationFrame(scrollStep)
        return
      }

      lastTimestamp = timestamp

      const maxScroll = element.scrollHeight - element.clientHeight

      if (scrollDirection === "down") {
        element.scrollTop += speedRef.current
        if (element.scrollTop >= maxScroll - 1) {
          setScrollDirection("up")
          setIsPaused(true)
          setTimeout(() => setIsPaused(false), pauseDuration)
        }
      } else {
        element.scrollTop -= speedRef.current
        if (element.scrollTop <= 1) {
          setScrollDirection("down")
          setIsPaused(true)
          setTimeout(() => setIsPaused(false), pauseDuration)
        }
      }

      animationRef.current = requestAnimationFrame(scrollStep)
    }

    animationRef.current = requestAnimationFrame(scrollStep)

    const handleMouseEnter = () => {
      if (pauseOnHover) setIsPaused(true)
    }

    const handleMouseLeave = () => {
      if (pauseOnHover) setIsPaused(false)
    }

    if (pauseOnHover) {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (pauseOnHover) {
        element?.removeEventListener("mouseenter", handleMouseEnter)
        element?.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [ref, scrollDirection, isPaused, pauseOnHover, pauseDuration])

  return {
    isPaused,
    setIsPaused,
    scrollDirection,
    setScrollDirection,
  }
}
