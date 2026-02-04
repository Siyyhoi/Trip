'use client'

import { motion } from "framer-motion"
import { Kanit } from 'next/font/google'
import { PhoneCall } from "lucide-react"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"

// Import Data จากไฟล์กลาง
import { emergencyContacts } from "@/src/data/essentials"

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring" as const,
        stiffness: 120,
        damping: 12
      } 
    }
}

export default function EmergencyPage() {
  // 1. ย้าย Hooks เข้ามาข้างใน Function Component
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [locale]);

  // 2. กำหนด Logic ภาษา
  const isEn = locale === 'en';

  const text = {
    badge: isEn ? "Emergency Services" : "紧急服务",
    title: isEn ? "Emergency Call" : "紧急呼叫",
    // เปลี่ยนจากภาษาไทยเป็น อังกฤษ/จีน ตาม Locale
    subtitle: isEn ? "Chiang Mai Emergency Numbers" : "清迈紧急电话", 
    tapHint: isEn ? "Tap to call" : "点击拨打"
  };

  return (
    <div className={`${kanit.className} min-h-screen flex flex-col items-center py-20 px-4 relative text-white overflow-hidden`}>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-500/10 rounded-full blur-[120px] -z-10 opacity-40" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 opacity-30" />

      {/* Header */}
      <div className="text-center mb-12 z-10">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4 shadow-lg shadow-red-500/20">
                <PhoneCall className="text-red-400 mr-2" />
                <span className="text-red-100 font-medium tracking-wide">
                    {text.badge}
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-white/70">
                {text.title}
            </h1>
            <p className="mt-4 text-white/60 text-lg font-light">
                {text.subtitle}
            </p>
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full max-w-7xl z-10"
      >
        {emergencyContacts.map((item) => {
            // 3. Logic สลับชื่อตามภาษา
            // ถ้า EN: โชว์ Title เป็นหลัก (อังกฤษ/ไทย)
            // ถ้า ZH: โชว์ TitleCn เป็นหลัก (จีน)
            const displayTitle = isEn ? item.title : item.titleCn;
            const displaySubtitle = isEn ? item.titleCn : item.title;

            return (
                <motion.a
                    href={`tel:${item.number.replace(/\s/g, '')}`} 
                    key={item.id}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block"
                >
                    <div className="h-full relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 p-6 flex flex-col items-start justify-between">
                    
                    <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-20 bg-linear-to-br ${item.gradient} group-hover:opacity-30 transition-opacity`} />

                    <div className="w-full mb-4">
                        <div className="flex justify-between items-start">
                            <div className={`p-3 rounded-2xl ${item.color} ${item.shadow} text-white mb-4`}>
                                {item.icon}
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 p-2 rounded-full">
                                <PhoneCall size={18} className="text-white" />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-3xl font-bold text-white tracking-wide">
                                {displayTitle}
                            </h3>
                            <p className="text-lg text-white/60 font-light">
                                {displaySubtitle}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto w-full pt-4">
                        <div className="h-px w-full bg-linear-to-r from-white/20 to-transparent mb-4"></div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-4xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/80 transition-all">
                                {item.number}
                            </span>
                        </div>
                        <p className="text-xs text-white/40 mt-2 font-light uppercase tracking-wider">
                            {text.tapHint}
                        </p>
                    </div>

                    </div>
                </motion.a>
            )
        })}
      </motion.div>
    </div>
  )
}