"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

// Типы для отзывов
interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  rating: number
  text: string
  image: string
  imageQuery?: string
}

export default function TestimonialsSection() {
  // Массив отзывов
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Сергей",
      position: "CEO",
      company: "TechVision",
      rating: 5,
      text: "Сотрудничество с Mol Digital превзошло все наши ожидания. Они создали для нас корпоративный сайт, который не только выглядит современно, но и отлично работает. Особенно впечатлила скорость загрузки и удобство администрирования. Рекомендую эту команду всем, кто ценит качество и профессионализм.",
      image: "/avatars/sergey.jpg",
      imageQuery: "professional business man in suit, portrait photo",
    },
    {
      id: 2,
      name: "Айгуль",
      position: "Маркетинг-директор",
      company: "Beauty Shop",
      rating: 5,
      text: "Наш интернет-магазин косметики разработан командой Mol Digital. Результат превзошел все ожидания! Сайт не только красивый, но и функциональный. Особенно радует, что после запуска конверсия выросла на 35%. Спасибо за профессиональный подход и внимание к деталям.",
      image: "/avatars/aigul.jpg",
      imageQuery: "professional kazakh business woman, portrait photo",
    },
    {
      id: 3,
      name: "Наташа",
      position: "Владелец",
      company: "Студия йоги 'Лотос'",
      rating: 4,
      text: "Для нашей студии йоги команда Mol Digital создала лендинг, который помог привлечь новых клиентов. Сайт получился атмосферным и полностью отражает философию нашей студии. Единственное, хотелось бы немного больше анимаций, но в целом результатом очень довольна!",
      image: "/avatars/natasha.jpg",
      imageQuery: "yoga studio owner woman, portrait photo",
    },
    {
      id: 4,
      name: "Нурсултан",
      position: "Директор",
      company: "Строительная компания 'Астана-Строй'",
      rating: 5,
      text: "Выражаю благодарность команде Mol Digital за разработку корпоративного сайта для нашей строительной компании. Сайт получился информативным, с удобной навигацией и современным дизайном. Отдельное спасибо за оперативность и готовность учесть все наши пожелания.",
      image: "/avatars/nursultan.jpg",
      imageQuery: "kazakh construction company director, portrait photo",
    },
    {
      id: 5,
      name: "Гаухар",
      position: "Основатель",
      company: "Образовательный центр 'Smart Kids'",
      rating: 5,
      text: "Обратились в Mol Digital для создания сайта нашего образовательного центра. Команда проявила высокий профессионализм и креативность. Сайт получился ярким, информативным и удобным как для родителей, так и для наших сотрудников. Особенно понравилась функция онлайн-записи на занятия.",
      image: "/avatars/gaukhar.jpg",
      imageQuery: "kazakh female education center founder, portrait photo",
    },
    {
      id: 6,
      name: "Серик",
      position: "Генеральный директор",
      company: "Логистическая компания 'TransKZ'",
      rating: 4,
      text: "Сотрудничаем с Mol Digital уже второй год. За это время они разработали для нас корпоративный сайт и личный кабинет для клиентов. Работа выполнена качественно, все сроки соблюдены. Радует, что команда всегда на связи и оперативно реагирует на наши запросы по доработке функционала.",
      image: "/avatars/serik.jpg",
    },
  ]

  // Состояние для отслеживания активного слайда на мобильных устройствах
  const [activeSlide, setActiveSlide] = useState(0)

  // Функции для навигации по слайдам
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Функция для отображения звездного рейтинга
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn({
            "fill-yellow-400 text-yellow-400": i < rating,
            "text-gray-600": i >= rating,
          })}
        />
      ))
  }

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы наших клиентов</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Узнайте, что говорят о нас клиенты, которые уже оценили качество наших услуг и сервиса
          </p>
        </div>

        {/* Мобильная версия - слайдер */}
        <div className="md:hidden">
          <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="absolute top-6 right-6 text-blue-500">
              <Quote size={32} />
            </div>
            <div className="mb-6 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonials[activeSlide].image || "/placeholder.svg?height=100&width=100&query=avatar"}
                  alt={testimonials[activeSlide].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">{testimonials[activeSlide].name}</h4>
                <p className="text-gray-400 text-sm">
                  {testimonials[activeSlide].position}, {testimonials[activeSlide].company}
                </p>
                <div className="flex mt-1">{renderStars(testimonials[activeSlide].rating)}</div>
              </div>
            </div>
            <p className="text-gray-300 mb-8">{testimonials[activeSlide].text}</p>

            <div className="flex justify-between">
              <button
                onClick={prevSlide}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeSlide ? "bg-blue-500" : "bg-gray-700"
                    }`}
                    aria-label={`Перейти к отзыву ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                aria-label="Следующий отзыв"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Десктопная версия - сетка */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-600/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/5"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 text-blue-500">
                  <Quote size={24} />
                </div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg?height=100&width=100&query=avatar"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.position}, {testimonial.company}
                    </p>
                    <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Присоединяйтесь к сотням довольных клиентов и доверьте нам создание вашего сайта
          </p>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-400 font-medium inline-flex items-center transition-colors"
          >
            Смотреть все отзывы
            <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
