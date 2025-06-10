"use client"

import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Вычисляем высоту документа без видимой области
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight

      // Вычисляем текущую позицию прокрутки
      const scrollPosition = window.scrollY

      // Вычисляем процент прокрутки
      const progress = (scrollPosition / totalHeight) * 100

      // Обновляем состояние
      setScrollProgress(progress)
    }

    // Добавляем обработчик события прокрутки
    window.addEventListener("scroll", handleScroll)

    // Вызываем обработчик сразу для инициализации
    handleScroll()

    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Прогресс прокрутки страницы"
      />
    </div>
  )
}
