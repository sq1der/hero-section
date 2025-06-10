"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const phoneNumber = "77066072335"
  const message = "Здравствуйте! Я хочу узнать подробнее о ваших услугах."

  // Показываем кнопку только после прокрутки
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Показываем кнопку сразу, если страница уже прокручена
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative group">
            <button
              onClick={handleWhatsAppClick}
              className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="Связаться через WhatsApp"
            >
              <div className="relative w-14 h-14">
                <Image src="/images/whatsapp-icon.png" alt="WhatsApp" fill className="object-contain" priority />
              </div>

              {/* Пульсирующий эффект */}
              <span className="absolute inset-0 rounded-full bg-green-500 opacity-25 animate-ping"></span>
            </button>

            {/* Всплывающая подсказка */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  className="absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  Написать в WhatsApp
                  <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
