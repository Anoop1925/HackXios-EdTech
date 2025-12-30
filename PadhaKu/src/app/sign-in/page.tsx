'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import SharedNavbar from "@/components/SharedNavbar";

export default function SignInPage() {
  const [isDark, setIsDark] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleAuth = async () => {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      {/* SHARED NAVBAR */}
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        showNavItems={true}
      />

      {/* MAIN CONTENT */}
      <div className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-8 overflow-hidden">
        {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2463] via-[#1e4fb8] via-[#2563eb] via-[#3d5ab8] to-[#4a4ab0]"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          {/* ANIMATED GRID */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="auth-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#auth-grid)" />
            </svg>
          </div>

          {/* ANIMATED CIRCLES */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-white/10"
                style={{
                  width: `${300 + i * 100}px`,
                  height: `${300 + i * 100}px`,
                  left: '50%',
                  top: '50%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* AUTH FORM CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="backdrop-blur-2xl bg-white/10 dark:bg-gray-900/40 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl p-8 relative overflow-hidden group">
            {/* GLOW EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* FLOATING PARTICLES */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-ping" />
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full animate-pulse" />

            <div className="relative z-10">
              {/* HEADER */}
              <h1 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                {isSignUp ? "Create Account" : "Sign In"}
              </h1>
              <p className="text-center text-gray-300 mb-6">
                {isSignUp ? "Join thousands of learners worldwide" : "Welcome back! Continue your learning journey"}
              </p>

              {/* GOOGLE SIGN IN BUTTON */}
              <motion.button
                onClick={handleGoogleAuth}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 py-3.5 mb-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold group"
              >
                <svg className="w-6 h-6" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.15 0 5.75 1.1 7.66 2.89l5.7-5.7C33.39 3.21 28.98 1.5 24 1.5 14.84 1.5 7.19 7.84 4.68 16.26l6.95 5.4C13.29 14.75 18.19 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M43.63 20.26H24v7.5h11.4c-1.34 3.58-4.39 6.44-8.4 7.5l6.95 5.4C40.81 36.16 44 30.07 44 24c0-.97-.1-1.92-.27-2.84l-.1-.9z"/>
                  <path fill="#FBBC05" d="M10.38 28.84C9.42 26.65 9 24.38 9 22c0-2.38.42-4.65 1.38-6.84L3.43 9.76C1.26 13.1 0 17.42 0 22s1.26 8.9 3.43 12.24l6.95-5.4z"/>
                  <path fill="#4285F4" d="M24 44.5c6.56 0 12.08-2.16 16.1-5.86l-6.95-5.4c-2.13 1.43-4.86 2.26-8.15 2.26-5.81 0-10.71-5.25-12.37-12.16l-6.95 5.4C7.19 40.16 14.84 44.5 24 44.5z"/>
                </svg>
                <span className="flex items-center gap-2">
                  {isSignUp ? "Sign up" : "Sign in"} with Google
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <div className="flex items-center my-5">
                <div className="flex-grow h-px bg-white/20" />
                <span className="px-4 text-gray-400 text-sm font-medium">or continue with email</span>
                <div className="flex-grow h-px bg-white/20" />
              </div>

              {/* EMAIL/PASSWORD FORM */}
              <form className="space-y-4">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all backdrop-blur-sm"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all backdrop-blur-sm"
                    />
                  </div>
                )}

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all backdrop-blur-sm"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all backdrop-blur-sm"
                />

                {!isSignUp && (
                  <div className="text-right">
                    <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              {/* TOGGLE SIGN IN/SIGN UP */}
              <p className="text-center text-sm mt-6 text-gray-300">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
