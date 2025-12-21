'use client'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Kanit } from 'next/font/google'

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
})

type HomeItem = {
  logo: string | null
}

export default function Navigation() {
  const t = useTranslations('Nav')
  const pathname = usePathname()

  const [, setHome] = useState<HomeItem[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [logoSrc, setLogoSrc] = useState<string>('')
  const [isLangOpen, setIsLangOpen] = useState(false)
  
  const [isMobile, setIsMobile] = useState(false)

  const navigationLinks = [
    { key: 'home', href: '/' },
    { key: 'products', href: './products/' },
    { key: 'map', href: './maps/' }
  ]

  const locales = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' }
  ]

  const switchLocale = (locale: string) =>
    pathname.replace(/^\/(en|zh)/, `/${locale}`)

  useEffect(() => {
    setIsClient(true)
    const cached = localStorage.getItem('navbar_logo_src')
    if (cached) setLogoSrc(cached)
    
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isClient) return
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isClient])

  useEffect(() => {
    if (isScrolled) setIsMenuOpen(false)
  }, [isScrolled])

  if (!isClient) return null

  return (
    <>
      <motion.nav
        layout
        animate={isMobile ? {
            // --- MOBILE STYLE (Clear Glass Island) ---
            y: 10,
            width: '95%',
            borderRadius: 24,
            // จุดที่แก้: ปรับให้โปร่งใส 100% ไม่มีสีเจือปน
            backgroundColor: 'transparent',
            // ยังคงความเบลอเพื่อให้ดูเป็น Layer กระจก
            backdropFilter: 'blur(20px)',
            // เงาและขอบสำคัญมาก เพื่อให้เห็นขอบเขตของกระจกใส
            boxShadow: (isMenuOpen || isScrolled) ? '0 8px 32px 0 rgba(0, 0, 0, 0.2)' : '0 2px 10px 0 rgba(0,0,0,0.05)',
            height: isMenuOpen ? 'auto' : '64px',
            border: (isScrolled || isMenuOpen) ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)'
        } : {
            // --- DESKTOP STYLE ---
            y: isScrolled ? 16 : 0,
            width: isScrolled ? '70%' : '75%',
            borderRadius: isScrolled ? 16 : 0,
            // จุดที่แก้: Desktop ตอน Scroll ก็โปร่งใส 100%
            backgroundColor: 'transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
            boxShadow: isScrolled ? '0 8px 32px 0 rgba(0, 0, 0, 0.1)' : 'none',
            height: '64px',
            border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed z-50 left-0 right-0 mx-auto flex flex-col ${kanit.className} overflow-hidden md:overflow-visible`}
      >
        <div className="relative w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shrink-0">

          {/* LEFT : LOGO */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              {logoSrc ? (
                <Image src={logoSrc} alt="logo" width={40} height={40} className="object-contain drop-shadow-sm" />
              ) : (
                <div className="bg-blue-600 h-8 w-24 flex items-center justify-center rounded shadow-sm">
                  <span className="text-white font-bold text-xs">LOGO</span>
                </div>
              )}
            </Link>
          </div>

          {/* CENTER : DESKTOP MENU */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex space-x-8">
              {navigationLinks.map(link => (
                <Link
                  key={link.key}
                  href={link.href}
                  // เพิ่ม text-shadow เล็กน้อยให้อ่านง่ายบนพื้นหลังใส
                  className="text-white font-bold hover:text-blue-400 transition text-sm uppercase tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT : DESKTOP LANGUAGE */}
          <div className="ml-auto relative hidden md:block">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsLangOpen(v => !v)
              }}
              // เพิ่ม text-shadow
              className="flex items-center gap-1 text-white font-semibold hover:text-blue-400 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              <span>{locales.find(l => pathname.includes(l.code))?.label || 'Language'}</span>
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  // Dropdown ก็ปรับให้ใสขึ้น (แต่ยังต้องมีสีบ้างไม่งั้นอ่านยาก)
                  className="absolute right-0 mt-4 w-32 rounded-xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden py-1 z-50"
                >
                  {locales.map(l => (
                    <Link
                      key={l.code}
                      href={switchLocale(l.code)}
                      onClick={() => setIsLangOpen(false)}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE BUTTON (HAMBURGER) */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white rounded-full hover:bg-white/10 transition drop-shadow-sm"
            >
              <span className="sr-only">{t('openMenu')}</span>
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU CONTENT */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              // ปรับสีเส้นแบ่งให้เข้ากับความใส
              className="md:hidden w-full border-t border-white/20"
            >
              <div className="flex flex-col px-4 pb-6 pt-2 space-y-2">
                {navigationLinks.map(link => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    // เพิ่ม text-shadow และปรับ hover
                    className="block px-4 py-3 rounded-xl text-white font-medium hover:bg-white/10 hover:text-blue-300 transition drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <div className="h-px bg-white/20 my-2 mx-4" />
                <div className="flex items-center gap-2 px-4 py-2">
                    <span className="text-white/70 text-sm font-medium uppercase tracking-wider drop-shadow-sm">Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-4">
                  {locales.map(l => (
                    <Link
                      key={l.code}
                      href={switchLocale(l.code)}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-center py-2 rounded-lg text-sm font-medium transition border shadow-sm ${
                         pathname.includes(`/${l.code}`) 
                         // ปรับสีปุ่มที่เลือกให้ดูใสๆ
                         ? 'bg-white/20 border-white/40 text-white' 
                         : 'border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </>
  )
}