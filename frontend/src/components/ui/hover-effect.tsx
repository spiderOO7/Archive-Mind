"use client"

import { cn } from "../../lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { X } from "lucide-react"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
    thumbnail: string
    id: string
    onRemove?: () => void
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn(" w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2px border-green-500", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-75 rounded-lg z-0"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.8,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-lg h-full w-full overflow-hidden bg-gray-900 border border-gray-800 relative z-10">
            <div className="relative h-60">
              <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
              {item.onRemove && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    item.onRemove?.()
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg text-white">{item.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

