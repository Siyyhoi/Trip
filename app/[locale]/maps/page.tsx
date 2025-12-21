'use client'
import Image from 'next/image'
import { useState } from 'react'
import { districts } from '@/app/src/data/chiangmai-districts'

export default function ChiangMaiMap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="w-full flex justify-center">
      {/* container ของแผนที่ */}
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
        <Image
          src="/Maps/CNX2.png"
          alt="Chiang Mai Map"
          width={600}
          height={1200}
          className="w-full h-auto object-contain"
          priority
        />

        {/* จุดอำเภอ (เปิดใช้ทีหลังได้) */}
        {/*
        {districts.map(d => (
          <div
            key={d.id}
            className="absolute"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            <div
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              onMouseEnter={() => setActive(d.id)}
              onMouseLeave={() => setActive(null)}
            />

            {active === d.id && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                  {d.th}
                </span>
              </div>
            )}
          </div>
        ))}
        */}
      </div>
    </div>
  )
}
