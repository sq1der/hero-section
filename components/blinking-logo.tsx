"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BlinkingLogo() {
  const [isVisible, setIsVisible] = useState(true)

  // Эффект мигания с использованием useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 1000) // Интервал мигания - 1 секунда

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.4 }}
          transition={{ duration: 0.3 }}
          className="h-6 w-6 bg-blue-600 rounded-sm relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-blue-400"
            animate={{
              opacity: [0, 0.7, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
