'use client'

import { motion } from "framer-motion"
import { Kanit } from 'next/font/google'
import Link from "next/link"
import Image from "next/image" // ✅ 1. เพิ่ม Import Image
import { ArrowLeft, Car, Bed, Map } from "lucide-react"
import { useLocale } from "next-intl"

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

// ✅ 2. แก้ไขข้อมูลให้ใส่ path รูปภาพ (ต้องเอารูปไปวางใน folder public/apps/)
const appCategories = [
  {
    title: "Ride Hailing",
    icon: <Car className="text-emerald-400" />,
    apps: [
      {
        name: "Grab",
        desc: "The #1 App for taxi & food delivery.",
        logo: "/apps/grab.png", // 👈 ใส่ชื่อไฟล์ตรงนี้
        tag: "Recommended"
      },
      {
        name: "Bolt",
        desc: "Often cheaper than Grab for rides.",
        logo: "/apps/bolt.png",
      },
      {
        name: "Maxim",
        desc: "Budget friendly, popular in local areas.",
        logo: "/apps/maxim.png",
      },
      {
        name: "MuvMi",
        desc: "Eco-friendly electric Tuk-Tuk sharing.",
        logo: "/apps/muvmi.png",
      }
    ]
  },
  {
    title: "Accommodation",
    icon: <Bed className="text-blue-400" />,
    apps: [
      {
        name: "Agoda",
        desc: "Best rates for hotels in Thailand.",
        logo: "/apps/agoda.png",
        tag: "Best Rates"
      },
      {
        name: "Booking.com",
        desc: "Wide range of hotels and hostels.",
        logo: "/apps/booking.png",
      },
      {
        name: "Airbnb",
        desc: "Great for long stays and condos.",
        logo: "/apps/airbnb.png",
      }
    ]
  },
  {
    title: "Navigation & Food",
    icon: <Map className="text-orange-400" />,
    apps: [
      {
        name: "Google Maps",
        desc: "Essential for navigation anywhere.",
        logo: "/apps/gmaps.png",
        tag: "Essential"
      },
      {
        name: "Wongnai",
        desc: "Thai version of Yelp. Find best local food.",
        logo: "/apps/wongnai.png",
      },
      {
        name: "Google Translate",
        desc: "Translate Thai text & voice easily.",
        logo: "/apps/translate.png", 
      }
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function AppsPage() {
  const locale = useLocale()

  return (
    <div className={`${kanit.className} min-h-screen text-white pb-20`}>
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto mt-20 px-6">
        
        {/* Header Section */}
        <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Essential Apps
            </h1>
            <p className="text-white/60 text-lg font-light">
                Applications you should have on your phone for a smooth trip.
            </p>
        </div>

        {/* Categories Grid */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {appCategories.map((category, idx) => (
                <div key={idx} className="relative">
                    
                    {/* Category Title */}
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                            {category.icon}
                        </div>
                        <h2 className="text-2xl font-semibold tracking-wide text-white/90">
                            {category.title}
                        </h2>
                    </div>

                    {/* Apps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {category.apps.map((app, appIdx) => (
                            <motion.div
                                key={appIdx}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 overflow-hidden"
                            >
                                {/* ✅ 3. ส่วนแสดงผล Logo (Image Component) */}
                                <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-lg bg-white/5">
                                    {/* ใส่รูปภาพที่นี่ 
                                      - fill: ให้รูปเต็มพื้นที่ parent
                                      - object-cover: ให้รูปไม่เบี้ยว 
                                    */}
                                    <Image 
                                        src={app.logo} 
                                        alt={app.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-lg truncate pr-2 text-white">{app.name}</h3>
                                        {app.tag && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                                                {app.tag}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-white/50 leading-snug group-hover:text-white/70 transition-colors line-clamp-2">
                                        {app.desc}
                                    </p>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:bg-white/10 transition-all pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>

        {/* Tips Footer */}
        <div className="mt-20 p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 text-center">
            <p className="text-white/70 text-sm">
                💡 <span className="font-semibold text-white">Pro Tip:</span> Download and register these apps <strong>before</strong> you arrive.
            </p>
        </div>

      </div>
    </div>
  )
}