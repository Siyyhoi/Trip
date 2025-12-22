'use client'
import { useEffect, useRef, useState } from 'react'

export default function ChiangMaiMap() {
  const objectRef = useRef<HTMLObjectElement | null>(null)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const obj = objectRef.current
    if (!obj) return

    const handleLoad = () => {
      const svgDoc = obj.contentDocument
      if (!svgDoc) return

      const paths = svgDoc.querySelectorAll('path')

      paths.forEach((p) => {
        const originalFill = getComputedStyle(p).fill

        const onClick = () => {
          setActive(p.id)
          paths.forEach(x => {
            x.style.fill = getComputedStyle(x).fill
          })
          p.style.fill = '#f97316'
        }

        p.addEventListener('click', onClick)

        p.style.cursor = 'pointer'
        p.style.transition = 'fill 0.2s ease'
        p.style.stroke = '#000'
        p.style.strokeWidth = '0.5'

        return () => {
          p.removeEventListener('click', onClick)
          p.style.fill = originalFill
        }
      })
    }

    obj.addEventListener('load', handleLoad)
    return () => obj.removeEventListener('load', handleLoad)
  }, [])

  return (
    <div className="w-full flex justify-center relative">
      <div className="relative w-full max-w-none">
      <object
        ref={objectRef}
        data="/Maps/chiangmai_svg.svg"
        type="image/svg+xml"
        className="w-full h-[100vh]"
      />
      </div>

      {/* Tooltip สำหรับมือถือ */}
      {active && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="relative bg-orange-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm">
            {active}

            {/* ลูกศร */}
            <div className="absolute left-1/2 -top-2 -translate-x-1/2
              w-0 h-0 border-l-8 border-r-8 border-b-8
              border-l-transparent border-r-transparent border-b-orange-500" />
          </div>
        </div>
      )}
    </div>
  )
}
