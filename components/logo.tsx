"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "light" | "dark" | "monochrome"
  animated?: boolean
}

export default function MolDigitalLogo({ className, size = "md", variant = "default", animated = true }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Определяем размеры логотипа
  const sizes = {
    sm: "h-8 w-auto",
    md: "h-10 w-auto",
    lg: "h-12 w-auto",
    xl: "h-16 w-auto",
  }

  // Определяем цветовые схемы
  const colors = {
    default: {
      primary: "#2563EB", // Синий
      secondary: "#7C3AED", // Фиолетовый
      accent: "#06B6D4", // Голубой
      text: "#FFFFFF", // Белый
    },
    light: {
      primary: "#2563EB",
      secondary: "#7C3AED",
      accent: "#06B6D4",
      text: "#1E293B", // Темно-серый
    },
    dark: {
      primary: "#3B82F6",
      secondary: "#8B5CF6",
      accent: "#22D3EE",
      text: "#F8FAFC", // Светло-серый
    },
    monochrome: {
      primary: "#2E2E2E",
      secondary: "#5E5E5E",
      accent: "#8E8E8E",
      text: "#FFFFFF",
    },
  }

  const selectedColors = colors[variant]

  // Анимация для логотипа
  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  }

  const circleVariants = {
    initial: {
      rotate: 0,
      opacity: 0.8,
    },
    hover: {
      rotate: 180,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  }

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  }

  return (
    <motion.div
      className={cn("relative flex items-center", sizes[size], className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={logoVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        {/* Фоновые элементы */}
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill={selectedColors.primary}
          variants={animated ? circleVariants : {}}
          initial="initial"
          animate={isHovered && animated ? "hover" : "initial"}
        />

        <motion.path
          d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44"
          stroke={selectedColors.accent}
          strokeWidth="2"
          strokeLinecap="round"
          variants={animated ? pathVariants : {}}
          initial="initial"
          animate="animate"
        />

        {/* Буква M стилизованная */}
        <motion.path
          d="M14 16L19 28L24 16L29 28L34 16"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={animated ? pathVariants : {}}
          initial="initial"
          animate="animate"
        />

        {/* Текст "Mol Digital" */}
        <text x="58" y="28" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" fill={selectedColors.text}>
          Mol Digital
        </text>

        {/* Декоративный элемент */}
        <motion.path
          d="M58 32H140"
          stroke={selectedColors.secondary}
          strokeWidth="2"
          strokeLinecap="round"
          variants={animated ? pathVariants : {}}
          initial="initial"
          animate="animate"
        />
      </svg>
    </motion.div>
  )
}
