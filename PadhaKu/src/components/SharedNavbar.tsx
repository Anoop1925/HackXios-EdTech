'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Home, LogIn, UsersRound, Sparkles, FolderOpen, Headphones } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SharedNavbarProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  activeSection?: string;
  scrollToSection?: (id: string) => void;
  showNavItems?: boolean;
}

export default function SharedNavbar({ 
  isDark, 
  setIsDark, 
  activeSection = 'home',
  scrollToSection,
  showNavItems = true 
}: SharedNavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      style={{ width: 'calc(100% - 6rem)' }}
    >
      {/* Single unified navbar container - more transparent, more blur */}
      <div className="relative flex items-center justify-between gap-8 px-6 py-2.5 rounded-full backdrop-blur-3xl border border-white/30 dark:border-gray-700/30 shadow-xl overflow-hidden">
        {/* Gradient Background Layer - More transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/15 via-gray-300/12 via-white/12 via-white/15 to-white/15 dark:from-gray-700/18 dark:via-gray-800/15 dark:via-gray-900/12 dark:via-gray-900/12 dark:to-gray-900/12"></div>
        
        {/* LEFT: LOGO */}
        <Link href="/home-new">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="shrink-0 cursor-pointer relative z-10 ml-2"
          >
            <Image
              src="/Main-logo22.png"
              alt="PadhaKU"
              width={175}
              height={58}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </Link>

        {/* CENTER: NAV ITEMS */}
        {showNavItems && (
          <div className="flex items-center gap-2 relative z-10">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'about-us', label: 'About Us', icon: UsersRound },
              { id: 'features', label: 'Features', icon: Sparkles },
              { id: 'assets', label: 'Assets', icon: FolderOpen },
              { id: 'support', label: 'Support', icon: Headphones },
            ].map((item) => (
              <Link key={item.id} href={`/home#${item.id}`}>
                <motion.button
                  onClick={() => scrollToSection?.(item.id)}
                  className={`relative px-5 py-3 rounded-full font-semibold text-[15px] transition-all duration-300 ${
                    activeSection === item.id
                      ? isDark
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-[#387BFF] text-white shadow-lg'
                      : isDark 
                        ? 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white'
                        : 'text-gray-800 drop-shadow-md hover:bg-[#387BFF]/80 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center gap-2.5">
                    <item.icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    {item.label}
                  </span>
                </motion.button>
              </Link>
            ))}
          </div>
        )}

        {/* RIGHT: THEME TOGGLE + SIGN IN */}
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              rotate: 180,
              backgroundColor: isDark ? 'rgba(79, 70, 229, 0.5)' : '#387BFF'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="p-3.5 rounded-full backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="w-5 h-5 text-amber-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="w-5 h-5 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Sign In Button */}
          <Link href="/sign-in">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full backdrop-blur-xl border border-white/30 font-semibold text-[15px] shadow-lg transition-all ${
                isDark
                  ? 'bg-white/10 text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white'
                  : 'bg-white/10 text-gray-700 hover:bg-[#387BFF] hover:text-white'
              }`}
            >
              <LogIn className="w-[18px] h-[18px]" strokeWidth={2.5} />
              <span>Sign In</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
