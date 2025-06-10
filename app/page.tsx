import Link from "next/link"
import { Button } from "@/components/ui/button"
import AutoScrollCarousel from "@/components/auto-scroll-carousel"
import PricingSection from "@/components/pricing-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import BlinkingLogo from "@/components/blinking-logo"
import TrustedCompanies from "@/components/trusted-companies"
import ContactButton from "@/components/contact-button"
import OurWorksSection from "@/components/our-works-section"
import { ChevronRight } from "lucide-react"

export default function Home() {
  // Массив изображений для карусели
  const carouselImages = [
    {
      src: "/website-screenshot.jpeg",
      alt: "Сайт образовательного агентства в Италии",
    },
    {
      src: "/website-screenshot-2.jpeg",
      alt: "Сайт проверки квалификации МЛС",
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BlinkingLogo />
          <span className="font-bold text-xl">Mol Digital</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="#" className="text-gray-300 hover:text-white transition">
            Услуги
          </Link>
          <Link href="#our-works" className="text-gray-300 hover:text-white transition">
            Наши работы
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition">
            Цены
          </Link>
          <Link href="#testimonials" className="text-gray-300 hover:text-white transition">
            Отзывы
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-white transition">
            Контакты
          </Link>
        </nav>
        <ContactButton type="contact" className="bg-blue-600 hover:bg-blue-700">
          Связаться
        </ContactButton>
      </header>

      <section className="container mx-auto py-16 md:py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <Link
              href="#our-works"
              className="inline-flex items-center text-sm bg-black border border-gray-700 rounded-full px-4 py-1 mb-6 hover:border-gray-500 transition"
            >
              <span>Посмотреть наши работы</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Мы создаём быстрые, масштабируемые сайты для бизнеса любого размера
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl">
            Агенстов Mol Digital создаёт продающий сайты с усиленной защитой от взлома и высокой конверсией в продажу.
            Наши сайты легко рекламировать и расширять
          </p>
          <div className="flex flex-wrap gap-4">
            <ContactButton type="contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6">
              Заказать консультацию
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </ContactButton>
            <Button
              variant="outline"
              className="border-blue-600/30 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 hover:border-blue-600/50 hover:text-blue-300 transition-all duration-300 px-6 py-6 group"
            >
              <Link href="#our-works" className="flex items-center gap-2">
                Наши работы
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-1">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              <div className="bg-gray-800 p-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-gray-700 rounded-full w-full h-6"></div>
              </div>
              <AutoScrollCarousel images={carouselImages} />
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
            <div className="text-3xl font-bold">100+</div>
            <div className="text-sm">успешных проектов</div>
          </div>
        </div>
      </section>

      {/* Раздел с нашими работами */}
      <OurWorksSection />

      {/* Раздел с ценами */}
      <PricingSection />

      {/* Раздел с отзывами */}
      <TestimonialsSection />

      {/* Раздел с контактами */}
      <ContactSection />

      {/* Раздел с логотипами компаний */}
      <TrustedCompanies />
    </div>
  )
}
