"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Send, MessageSquare, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Сбросить состояние успешной отправки через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string || '',
    }

    try {
      await sendToTelegram(data)
      alert('Заявка отправлена! Мы скоро свяжемся с вами.')
    } catch (error) {
      console.error('Ошибка отправки:', error)
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }
  const sendToTelegram = async (data: {
    name: string
    email: string
    phone: string
    message: string
  }) => {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
    
    const text = `📌 Новая заявка!\n\n👤 Имя: ${data.name}\n📧 Email: ${data.email}\n📞 Телефон: ${data.phone}\n📝 Сообщение: ${data.message}`
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    })
    
    if (!response.ok) throw new Error('Ошибка отправки в Telegram')
  }

  return (
    <section id="contact" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Свяжитесь с нами, чтобы обсудить ваш проект или получить консультацию по любым вопросам
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Наши контакты</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Адрес</h4>
                    <p className="text-gray-400 mt-1">Астана, Достык 5, ЖК Северное Сияние</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Телефон</h4>
                    <a href="tel:+77026727749" className="text-gray-400 mt-1 hover:text-blue-400 transition-colors">
                      +7 702 672 7749
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Почта</h4>
                    <a href="mailto:info@molit.kz" className="text-gray-400 mt-1 hover:text-blue-400 transition-colors">
                      info@molit.kz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Режим работы</h4>
                    <p className="text-gray-400 mt-1">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-gray-400">Сб-Вс: Выходной</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h4 className="font-medium text-lg mb-4">Мы в социальных сетях</h4>
                <div className="flex gap-4">
                  {["facebook", "instagram", "twitter", "linkedin"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-gray-800 hover:bg-blue-600 transition-colors p-3 rounded-full"
                      aria-label={social}
                    >
                      <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 h-[300px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.5144566296927!2d71.41692867677872!3d51.12926583957091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4245853a4e2d9c0f%3A0x7c4f64e7a6ae5e0!2z0JbQmiDQodC10LLQtdGA0L3QvtC1INCh0LjRj9C90LjQtSwg0JTQvtGB0YLRi9C6IDUsINCQ0YHRgtCw0L3QsCAwMTAwMDAsINCa0LDQt9Cw0YXRgdGC0LDQvQ!5e0!3m2!1sru!2sru!4v1713694845020!5m2!1sru!2sru"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта расположения офиса Mol Digital"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Наш офис</span>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
            <p className="text-gray-400 mb-8">
              Заполните форму ниже, и мы свяжемся с вами в ближайшее время для обсуждения вашего проекта
            </p>

            {isSubmitted ? (
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-6 text-center">
                <div className="bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-green-500 mb-2">Сообщение отправлено!</h4>
                <p className="text-gray-300">Спасибо за обращение. Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Введите ваше имя"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Введите ваш email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Введите ваш телефон"
                    value={formState.phone}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Опишите ваш проект или вопрос"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 focus:border-blue-500 min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Отправить сообщение
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}

            <div className="mt-8 pt-8 border-t border-gray-800 flex items-center gap-3">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-gray-400 text-sm">
                Предпочитаете быстрый ответ? Напишите нам в{" "}
                <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                  WhatsApp
                </a>{" "}
                или{" "}
                <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
                  Telegram
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
