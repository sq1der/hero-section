"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Типы для проектов
interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  tags: string[]
  features: string[]
  year: string
}

export default function OurWorksSection() {
  // Массив проектов
  const projects: Project[] = [
    {
      id: "kursgo",
      title: "KursGo",
      description: "Образовательная платформа для курсов программирования",
      image: "/projects/kursgo.png",
      url: "https://kursgo.kz",
      tags: ["Образование", "Курсы", "Программирование"],
      features: ["Каталог курсов", "Личный кабинет", "Онлайн-оплата", "Адаптивный дизайн"],
      year: "2023",
    },
    {
      id: "ndtedu",
      title: "NDT Education",
      description: "Центр обучения и аттестации специалистов неразрушающего контроля",
      image: "/projects/ndtedu.png",
      url: "https://ndtedu.kz",
      tags: ["Образование", "Сертификация", "Промышленность"],
      features: ["Каталог курсов", "Онлайн-запись", "Информация о сертификации", "Корпоративный стиль"],
      year: "2022",
    },
    {
      id: "newmotors",
      title: "New Motors",
      description: "Интернет-магазин автомобильных двигателей с гарантией",
      image: "/projects/newmotors.png",
      url: "https://newmotors.kz",
      tags: ["Автомобили", "Интернет-магазин", "Запчасти"],
      features: ["Каталог товаров", "Фильтрация", "Корзина", "Онлайн-оплата", "Доставка"],
      year: "2023",
    },
    {
      id: "allfasad",
      title: "Agregator",
      description: "Компания по продаже фиброцементных панелей и фасадных решений",
      image: "/projects/allfasad.png",
      url: "https://allfasad.kz",
      tags: ["Строительство", "Фасады", "Материалы"],
      features: ["Каталог продукции", "Портфолио проектов", "Калькулятор стоимости", "Форма заявки"],
      year: "2022",
    },
    {
      id: "molavto",
      title: "MolAvto",
      description: "Интернет-магазин автомобильных аксессуаров и ковриков",
      image: "/projects/molavto.png",
      url: "https://molavto.kz",
      tags: ["Автомобили", "Аксессуары", "Интернет-магазин"],
      features: ["Каталог по маркам авто", "Корзина", "Отзывы", "Доставка", "Онлайн-оплата"],
      year: "2024",
    },
  ]

  // Состояние для отслеживания активного проекта
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  // Функции для навигации по проектам
  const nextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Получаем активный проект
  const activeProject = projects[activeProjectIndex]

  // Обработка автоматической прокрутки
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Сбрасываем позицию скролла при смене проекта
    container.scrollTop = 0
    setScrollPosition(0)

    // Устанавливаем максимальную высоту прокрутки
    setMaxScroll(container.scrollHeight - container.clientHeight)

    let animationId: number
    let lastTimestamp = 0
    const speed = 1 // Скорость прокрутки в пикселях за кадр

    const scrollStep = (timestamp: number) => {
      if (!container) return

      // Пропускаем анимацию, если на паузе
      if (isPaused) {
        animationId = requestAnimationFrame(scrollStep)
        return
      }

      // Ограничиваем частоту обновления для более плавной анимации
      if (timestamp - lastTimestamp < 16) {
        // примерно 60fps
        animationId = requestAnimationFrame(scrollStep)
        return
      }

      lastTimestamp = timestamp

      // Обновляем позицию скролла
      if (container.scrollTop < container.scrollHeight - container.clientHeight) {
        container.scrollTop += speed
        setScrollPosition(container.scrollTop)
      } else {
        // Достигли конца, возвращаемся в начало с небольшой паузой
        setTimeout(() => {
          if (container) {
            container.scrollTop = 0
            setScrollPosition(0)
          }
        }, 1000)
      }

      animationId = requestAnimationFrame(scrollStep)
    }

    animationId = requestAnimationFrame(scrollStep)

    // Останавливаем анимацию при наведении мыши
    const handleMouseEnter = () => {
      setIsPaused(true)
    }

    const handleMouseLeave = () => {
      setIsPaused(false)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Обработчик для отслеживания позиции скролла
    const handleScroll = () => {
      if (container) {
        setScrollPosition(container.scrollTop)
      }
    }

    container.addEventListener("scroll", handleScroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [activeProjectIndex, isPaused, projects.length])

  return (
    <section id="our-works" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ознакомьтесь с нашими последними проектами. Мы создаем современные, функциональные и красивые сайты для
            различных отраслей бизнеса.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Информация о проекте */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-bold">{activeProject.title}</h3>
                <Badge variant="outline" className="text-blue-400 border-blue-400">
                  {activeProject.year}
                </Badge>
              </div>
              <p className="text-xl text-gray-300">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {activeProject.tags.map((tag) => (
                  <Badge key={tag} className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Особенности проекта:</h4>
              <ul className="space-y-2">
                {activeProject.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 group"
              >
                Посетить сайт
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <Button
                variant="outline"
                className={`border-gray-700 hover:border-blue-600/50 text-white hover:bg-blue-600/10 transition-all duration-300 ${
                  isPaused ? "bg-blue-600/10 border-blue-600/30 text-blue-400" : ""
                }`}
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? (
                  <>
                    <Play size={16} className="mr-2 text-blue-400" />
                    <span>Продолжить прокрутку</span>
                  </>
                ) : (
                  <>
                    <Pause size={16} className="mr-2" />
                    <span>Остановить прокрутку</span>
                  </>
                )}
              </Button>
            </div>

            {/* Навигация по проектам */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-800">
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-blue-600/10 hover:text-blue-400 transition-all duration-300 group"
                onClick={prevProject}
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Предыдущий проект
              </Button>
              <div className="flex gap-1">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProjectIndex(index)}
                    className={cn("w-2 h-2 rounded-full transition-colors", {
                      "bg-blue-500": index === activeProjectIndex,
                      "bg-gray-700": index !== activeProjectIndex,
                    })}
                    aria-label={`Перейти к проекту ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-blue-600/10 hover:text-blue-400 transition-all duration-300 group"
                onClick={nextProject}
              >
                Следующий проект
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Окно предпросмотра с прокруткой */}
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-1">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                {/* Имитация браузерной строки */}
                <div className="bg-gray-800 p-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-gray-700 rounded-full w-full h-6 flex items-center px-3">
                    <span className="text-xs text-gray-400 truncate">{activeProject.url}</span>
                  </div>
                </div>

                {/* Контейнер для прокрутки */}
                <div
                  ref={scrollContainerRef}
                  className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 select-none"
                >
                  <Image
                    src={activeProject.image || "/placeholder.svg"}
                    width={1200}
                    height={3000}
                    alt={`Скриншот сайта ${activeProject.title}`}
                    className="w-full h-auto pointer-events-none select-none"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Индикатор прокрутки */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-gray-800 rounded-full overflow-hidden mr-4">
              <div
                className="w-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{
                  height: `${maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0}%`,
                  top: 0,
                }}
              ></div>
            </div>

            {/* Подсказка о прокрутке */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded-full pointer-events-none">
              Наведите для остановки прокрутки
            </div>
          </div>
        </div>

        {/* Дополнительная информация о проектах */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-blue-500 mb-2">50+</div>
              <h3 className="text-xl font-semibold mb-2">Завершенных проектов</h3>
              <p className="text-gray-400">
                Мы успешно реализовали более 50 проектов различной сложности для клиентов из разных отраслей.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-blue-500 mb-2">100%</div>
              <h3 className="text-xl font-semibold mb-2">Довольных клиентов</h3>
              <p className="text-gray-400">
                Все наши клиенты остались довольны результатом работы и рекомендуют нас своим партнерам.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
              <h3 className="text-xl font-semibold mb-2">Техническая поддержка</h3>
              <p className="text-gray-400">
                Мы обеспечиваем круглосуточную техническую поддержку для всех наших проектов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
