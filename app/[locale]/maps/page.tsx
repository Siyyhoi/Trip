'use client'
import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl' // 1. Import Hook สำหรับแปลภาษา
import { districts } from '@/src/data/chiangmai-districts'

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}


export default function ChiangMaiMap() {
  // 2. เรียกใช้ Hook แปลภาษา (ระบุ Namespace ให้ตรงกับ JSON)
  const t = useTranslations('District') 
  const tNav = useTranslations('Nav') // สมมติว่าอยากใช้คำว่า Map หรือ Home จาก Nav
  const tUI = useTranslations('MapUI') 
  const locale = useLocale()

  const [active, setActive] = useState<string | null>(null)
  const activeDistrict = districts.find(d => d.id === active)

  const toggleDistrict = (id: string) => {
    setActive(prev => prev === id ? null : id)
  }

  return (
    <div className="w-full flex flex-col items-center py-6 md:py-10">
      
      <div className="relative w-full max-w-2xl px-4">

        {/* ================= MAP SECTION ================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full"
        >
          <img
            src="/Maps/CNX3.png"
            alt="Chiang Mai Map"
            className="w-full h-auto object-contain drop-shadow-xl rounded-2xl"
          />

          {/* Pin Dots */}
          {districts.map((d, i) => (
            <motion.button
              key={d.id}
              onClick={() => toggleDistrict(d.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + (i * 0.05), type: "spring" }}
              
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{ left: `${d.center.x}%`, top: `${d.center.y}%` }}
            >
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping 
                ${active === d.id ? 'bg-orange-400 duration-1000' : 'bg-red-400 duration-[2s]'}
              `}></span>
              
              <span className={`relative inline-flex rounded-full border-2 border-white shadow-md transition-all duration-300
                ${active === d.id ? 'bg-orange-600 w-8 h-8 scale-110 z-20' : 'bg-red-500 w-5 h-5 md:w-6 md:h-6 hover:scale-125'}
              `}></span>
            </motion.button>
          ))}

          {/* Tooltip Popup */}
          <AnimatePresence>
            {activeDistrict && (
              <motion.div
                key={activeDistrict.id}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${activeDistrict.center.x}%`,
                  top: `${activeDistrict.center.y}%`
                }}
              >
                <div className="relative -translate-x-1/2 -translate-y-full -mt-3 md:-mt-3">
                  <Link 
                    href={`/${locale}/travel/${activeDistrict.id}`}
                    className="group pointer-events-auto flex items-center gap-3 bg-gray-900 text-white pl-4 pr-3 py-3 rounded-xl shadow-2xl border border-gray-700 hover:bg-black transition-all cursor-pointer"
                  >
                    <div>
                      <span className="block text-xs text-orange-400 font-bold tracking-widest uppercase mb-0.5">
                        {tUI('district_label')}
                      </span>
                      <span className="block text-lg font-bold leading-none whitespace-nowrap">
                        {/* 3. ใช้ t() แทน formatName() */}
                        {t(activeDistrict.id)}
                      </span>
                    </div>
                    <motion.div 
                      whileHover={{ x: 3 }}
                      className="bg-orange-500 rounded-lg p-1.5 group-hover:bg-orange-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </motion.div>
                  </Link>
                  
                  <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ================= LIST CONTROL SECTION ================= */}
        <motion.div 
          className="mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1"
          >
             {/* คุณควรเพิ่ม key "quick_select" ใน JSON เพื่อแปลคำนี้ด้วย */}
             {tUI('quick_select')}
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {districts.map((d) => (
              <motion.button
                key={d.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDistrict(d.id)}
                className={`
                  relative px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors duration-200 border
                  ${active === d.id 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-200 z-10' 
                    : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200 hover:bg-orange-50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  {/* 4. ใช้ t() ตรงนี้เช่นกัน */}
                  <span>{t(d.id)}</span>
                  {active === d.id && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
