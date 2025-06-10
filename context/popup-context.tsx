"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type FormType = "contact" | "landing" | "corporate" | "store" | null

interface PopupContextType {
  isOpen: boolean
  formType: FormType
  openPopup: (type: FormType) => void
  closePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formType, setFormType] = useState<FormType>(null)

  const openPopup = (type: FormType) => {
    setFormType(type)
    setIsOpen(true)
    // Блокируем прокрутку страницы при открытии попапа
    document.body.style.overflow = "hidden"
  }

  const closePopup = () => {
    setIsOpen(false)
    // Восстанавливаем прокрутку страницы при закрытии попапа
    document.body.style.overflow = "auto"
  }

  return <PopupContext.Provider value={{ isOpen, formType, openPopup, closePopup }}>{children}</PopupContext.Provider>
}

export function usePopup() {
  const context = useContext(PopupContext)
  if (context === undefined) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
}
