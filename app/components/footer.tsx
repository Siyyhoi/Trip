'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const locale = useLocale();

  useEffect(() => {
    fetch('/api/visitors')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setVisitorCount(data.count);
        }
      })
      .catch((err) => console.error("Error updating visitors:", err));
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-auto w-full border-t bg-slate-950 border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 md:flex md:items-center md:justify-between">

        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex justify-center md:justify-start"
        >
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/Logo/Logo.png"
              alt="Trip Chin Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        </motion.div>

        {/* Visitor Counter Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 md:mt-0 flex flex-col items-center md:items-end gap-1"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Total Visitors
          </p>

          <motion.div
            key={visitorCount} // animate ทุกครั้งที่เลขเปลี่ยน
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>

            <span className="text-lg font-mono font-semibold text-zinc-200">
              {visitorCount !== null ? visitorCount.toLocaleString() : "..."}
            </span>
          </motion.div>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export default Footer;
