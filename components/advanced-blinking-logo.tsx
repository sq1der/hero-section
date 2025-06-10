"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface AdvancedBlinkingLogoProps {
  size?: "sm" | "md" | "lg"
  blinkSpeed?: "slow" | "medium" | "fast"
  color?: string
}

export default function AdvancedBlinkingLogo({
  size = "md",
  blinkSpeed = "medium",
  color = "#2563EB", // Синий по умолчанию
}: AdvancedBlinkingLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Определяем размеры логотипа
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  // Определяем скорость мигания
  const speeds = {
    slow: 2,
    medium: 1.5,
    fast: 0.8,
  }

  // Эффект мигания с внутренним свечением
  return (
    <motion.div
      className={`relative ${sizes[size]} rounded-sm overflow-hidden`}
      style={{ backgroundColor: color }}
      animate={{
        boxShadow: ["0 0 0px rgba(37, 99, 235, 0)", "0 0 10px rgba(37, 99, 235, 0.7)", "0 0 0px rgba(37, 99, 235, 0)"],
      }}
      transition={{
        duration: speeds[blinkSpeed],
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Внутренний пульсирующий эффект */}
      <motion.div
        className="absolute inset-0 bg-blue-400"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? [0, 0.7, 0] : [0, 0.3, 0],
          scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
        }}
        transition={{
          duration: isHovered ? 1 : speeds[blinkSpeed],
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />

      {/* Дополнительный элемент для более сложного эффекта */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      )}
    </motion.div>
  )
}
