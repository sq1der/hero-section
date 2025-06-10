import { Check, Layout, Building2, ShoppingBag, ArrowRight } from "lucide-react"
import ContactButton from "@/components/contact-button"

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши тарифы</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Выберите оптимальное решение для вашего бизнеса. Мы предлагаем различные варианты сайтов под любые задачи и
            бюджеты.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Landing Page */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/10">
            <div className="p-8">
              <div className="h-12 w-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Landing Page</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-gray-400 text-sm mr-1">от</span>
                <span className="text-4xl font-bold">250,000</span>
                <div className="text-gray-400 pb-1">
                  <span className="font-medium">KZT</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8">
                Идеальное решение для презентации продукта, услуги или события. Одностраничный сайт с высокой
                конверсией.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Адаптивный дизайн",
                  "SEO-оптимизация",
                  "Форма обратной связи",
                  "Интеграция с аналитикой",
                  "Базовая анимация",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 pb-8">
              <ContactButton type="landing" className="w-full bg-blue-600 hover:bg-blue-700">
                Заказать Landing Page
              </ContactButton>
            </div>
          </div>

          {/* Корпоративный сайт (бывший Corporate Website) */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              Популярный
            </div>
            <div className="p-8">
              <div className="h-12 w-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Корпоративный сайт</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-gray-400 text-sm mr-1">от</span>
                <span className="text-4xl font-bold">550,000</span>
                <div className="text-gray-400 pb-1">
                  <span className="font-medium">KZT</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8">
                Полноценный корпоративный сайт с уникальным дизайном и всеми необходимыми функциями для вашего бизнеса.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Многостраничный сайт",
                  "Уникальный дизайн",
                  "Админ-панель",
                  "Блог и новости",
                  "Интеграция с CRM",
                  "Расширенная SEO-оптимизация",
                  "Мультиязычность",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 pb-8">
              <ContactButton type="corporate" className="w-full bg-blue-600 hover:bg-blue-700">
                Заказать корпоративный сайт
              </ContactButton>
            </div>
          </div>

          {/* Интернет-магазин (бывший Online Store) */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/10">
            <div className="p-8">
              <div className="h-12 w-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Интернет-магазин</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-gray-400 text-sm mr-1">от</span>
                <span className="text-4xl font-bold">1,250,000</span>
                <div className="text-gray-400 pb-1">
                  <span className="font-medium">KZT</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8">
                Полнофункциональный интернет-магазин с каталогом товаров, корзиной, оплатой и всеми необходимыми
                модулями.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Каталог товаров",
                  "Корзина и оформление заказа",
                  "Интеграция с платежными системами",
                  "Личный кабинет пользователя",
                  "Система скидок и промокодов",
                  "Интеграция с 1С/ERP",
                  "Мобильное приложение (опционально)",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 pb-8">
              <ContactButton type="store" className="w-full bg-blue-600 hover:bg-blue-700">
                Заказать интернет-магазин
              </ContactButton>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Нужно индивидуальное решение? Мы готовы обсудить ваш проект и предложить оптимальный вариант.
          </p>
          <ContactButton
            type="contact"
            variant="outline"
            className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-600/30 hover:border-blue-600/50 text-white hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 px-8 py-6 group"
          >
            <span className="flex items-center gap-2">
              Получить индивидуальное предложение
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </ContactButton>
        </div>
      </div>
    </section>
  )
}
