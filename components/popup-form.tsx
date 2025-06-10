"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { usePopup } from "@/context/popup-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function PopupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, formType, closePopup } = usePopup()
  const formRef = useRef<HTMLDivElement>(null)

  // Закрытие попапа при клике вне формы
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        closePopup()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, closePopup])

  // Закрытие попапа при нажатии Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, closePopup])

  if (!isOpen) return null

  // Определяем заголовок формы в зависимости от типа
  const getFormTitle = () => {
    switch (formType) {
      case "contact":
        return "Связаться с нами"
      case "landing":
        return "Заказать Landing Page"
      case "corporate":
        return "Заказать корпоративный сайт"
      case "store":
        return "Заказать интернет-магазин"
      default:
        return "Заказать консультацию"
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string || '',
      formType: formType || 'default'
    }

    try {
      await sendToTelegram(data)
      alert('Заявка отправлена! Мы скоро свяжемся с вами.')
      closePopup()
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
    formType: string
  }) => {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
    
    const text = `📌 Новая заявка (${data.formType})!\n\n👤 Имя: ${data.name}\n📧 Email: ${data.email}\n📞 Телефон: ${data.phone}\n📝 Сообщение: ${data.message}`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div
        ref={formRef}
        className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md p-6 shadow-xl animate-scaleIn"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{getFormTitle()}</h3>
          <button
            onClick={closePopup}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              name="name"
              placeholder="Введите ваше имя"
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
              required
              className="bg-gray-800 border-gray-700 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Введите ваш телефон"
              className="bg-gray-800 border-gray-700 focus:border-blue-500"
            />
          </div>

          {formType !== "contact" && (
            <div className="space-y-2">
              <Label htmlFor="message">Описание проекта</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Опишите ваш проект или задачу"
                className="bg-gray-800 border-gray-700 focus:border-blue-500 min-h-[100px]"
              />
            </div>
          )}

          <div className="pt-2">
          <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? 'Отправка...' : 'Отправить заявку'}
      </Button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Нажимая кнопку "Отправить заявку", вы соглашаетесь с нашей{" "}
            <a href="#" className="text-blue-400 hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
