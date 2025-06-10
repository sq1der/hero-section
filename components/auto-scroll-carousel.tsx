"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AutoScrollCarouselProps {
  images: {
    src: string
    alt: string
  }[]
}

export default function AutoScrollCarousel({ images }: AutoScrollCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down")
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number | null>(null)
  const speedRef = useRef(2.5) // Скорость прокрутки в пикселях за кадр

  // Для обработки свайпа
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Переключение на следующее изображение
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  // Переключение на предыдущее изображение
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Обработка автоматической прокрутки
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Сбрасываем позицию скролла при смене изображения
    container.scrollTop = 0
    setScrollDirection("down")

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
  }, [scrollDirection, isPaused, currentImageIndex, images.length])

  // Обработка свайпов
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX
      handleSwipe()
    }

    const handleSwipe = () => {
      if (touchStartX.current === null || touchEndX.current === null) return

      const swipeDistance = touchEndX.current - touchStartX.current

      // Если свайп достаточно длинный (более 50px)
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          // Свайп вправо - предыдущее изображение
          prevImage()
        } else {
          // Свайп влево - следующее изображение
          nextImage()
        }
      }

      // Сбрасываем значения
      touchStartX.current = null
      touchEndX.current = null
    }

    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 select-none"
      >
        <Image
          src={images[currentImageIndex].src || "/placeholder.svg"}
          width={1200}
          height={3000}
          alt={images[currentImageIndex].alt}
          className="w-full h-auto pointer-events-none select-none"
          priority
        />
      </div>

      {/* Навигационные кнопки */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Предыдущий сайт"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Следующий сайт"
      >
        <ChevronRight size={20} />
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Перейти к сайту ${index + 1}`}
          />
        ))}
      </div>

      {/* Подсказка о свайпе */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded-full pointer-events-none">
        Свайпните для переключения
      </div>
    </div>
  )
}
