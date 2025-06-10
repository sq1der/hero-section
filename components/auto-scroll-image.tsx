"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function AutoScrollImage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down")
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number | null>(null)
  const speedRef = useRef(2.5) // Скорость прокрутки в пикселях за кадр

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let lastTimestamp = 0
    const scrollStep = (timestamp: number) => {
      if (!container) return

      // Пропускаем анимацию, если на паузе
      if (isPaused) {
        animationRef.current = requestAnimationFrame(scrollStep)
        return
      }

      // Ограничиваем частоту обновления для более плавной анимации
      if (timestamp - lastTimestamp < 16) {
        // примерно 60fps
        animationRef.current = requestAnimationFrame(scrollStep)
        return
      }

      lastTimestamp = timestamp

      const maxScroll = container.scrollHeight - container.clientHeight

      if (scrollDirection === "down") {
        container.scrollTop += speedRef.current
        if (container.scrollTop >= maxScroll - 1) {
          // Достигли низа, меняем направление
          setScrollDirection("up")
          // Небольшая пауза внизу
          setIsPaused(true)
          setTimeout(() => setIsPaused(false), 1000)
        }
      } else {
        container.scrollTop -= speedRef.current
        if (container.scrollTop <= 1) {
          // Достигли верха, меняем направление
          setScrollDirection("down")
          // Небольшая пауза вверху
          setIsPaused(true)
          setTimeout(() => setIsPaused(false), 1000)
        }
      }

      animationRef.current = requestAnimationFrame(scrollStep)
    }

    animationRef.current = requestAnimationFrame(scrollStep)

    // Останавливаем анимацию при наведении мыши
    const handleMouseEnter = () => {
      setIsPaused(true)
    }

    const handleMouseLeave = () => {
      setIsPaused(false)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      container?.removeEventListener("mouseenter", handleMouseEnter)
      container?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [scrollDirection, isPaused])

  return (
    <div
      ref={scrollContainerRef}
      className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 select-none"
    >
      <Image
        src="/website-screenshot.jpeg"
        width={1200}
        height={3000}
        alt="Пример интерфейса сайта"
        className="w-full h-auto pointer-events-none select-none"
        priority
      />
    </div>
  )
}
