'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Bell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SharedNavbar from '@/components/SharedNavbar';

export default function PrivacyPolicy() {
  const [isDark, setIsDark] = useState(false);

  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        {
          subtitle: 'Account Information',
          text: 'When you create an account, we collect your name, email address, and profile information through Google OAuth authentication. We do not store your Google password.'
        },
        {
          subtitle: 'Learning Data',
          text: 'We collect information about your learning activities including courses completed, quiz scores, progress tracking, and AI-generated content interactions to personalize your experience.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect device information, browser type, IP address, and usage patterns to improve our platform and ensure security.'
        },
        {
          subtitle: 'Camera & Microphone (Optional)',
          text: 'For features like DrawInAir (gesture recognition) and AI Mentor (voice chat), we may access your camera and microphone only with your explicit permission. This data is processed in real-time and not stored permanently.'
        }
      ]
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          subtitle: 'Personalized Learning',
          text: 'We use AI to analyze your learning patterns and generate customized courses, quizzes, and recommendations tailored to your educational goals.'
        },
        {
          subtitle: 'Platform Improvement',
          text: 'Your usage data helps us enhance features, fix bugs, and develop new functionalities to provide a better learning experience.'
        },
        {
          subtitle: 'Gamification & Leaderboards',
          text: 'We use your points, achievements, and progress data to display your rank on leaderboards and award badges. You can opt out of public leaderboards in settings.'
        },
        {
          subtitle: 'Communication',
          text: 'We may send you educational notifications, course updates, and platform announcements. You can control notification preferences in your account settings.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'Data Security & Storage',
      gradient: 'from-emerald-500 to-teal-500',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols. Passwords are hashed using bcrypt with salt rounds.'
        },
        {
          subtitle: 'Database Security',
          text: 'Your data is stored securely on Supabase (PostgreSQL) with row-level security policies, regular backups, and restricted access controls.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'We use trusted third-party services: Google (authentication & classroom integration), Gemini AI (course generation & analysis), Vapi (voice AI), and YouTube (video embedding). These services have their own privacy policies.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your account data as long as your account is active. You can request account deletion at any time, and we will delete your data within 30 days.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'Data Sharing & Disclosure',
      gradient: 'from-orange-500 to-amber-500',
      content: [
        {
          subtitle: 'We DO NOT Sell Your Data',
          text: 'We never sell, rent, or trade your personal information to third parties for marketing purposes.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We share minimal necessary data with service providers (Google Cloud, Supabase, AI APIs) solely to operate the platform. They are contractually bound to protect your data.'
        },
        {
          subtitle: 'Legal Compliance',
          text: 'We may disclose information if required by law, court order, or government regulation, or to protect the safety and rights of our users.'
        },
        {
          subtitle: 'Public Information',
          text: 'Your display name and leaderboard rank are visible to other users. Profile pictures (from Google) are only shown if you consent. You can use anonymous mode to hide your identity on leaderboards.'
        }
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights & Choices',
      gradient: 'from-rose-500 to-pink-500',
      content: [
        {
          subtitle: 'Access & Download',
          text: 'You can access, review, and download your personal data at any time through your account dashboard.'
        },
        {
          subtitle: 'Correction & Update',
          text: 'You can update your profile information, email, and preferences directly in your account settings.'
        },
        {
          subtitle: 'Deletion',
          text: 'You have the right to request permanent deletion of your account and all associated data. Contact us at support@padhaku.com to initiate deletion.'
        },
        {
          subtitle: 'Opt-Out Options',
          text: 'You can disable notifications, hide from leaderboards, and restrict camera/microphone access at any time. Some features may require these permissions to function.'
        },
        {
          subtitle: 'Cookie Management',
          text: 'We use essential cookies for authentication (NextAuth sessions). You can disable non-essential cookies through your browser settings.'
        }
      ]
    },
    {
      icon: Bell,
      title: "Children's Privacy (COPPA Compliance)",
      gradient: 'from-indigo-500 to-purple-500',
      content: [
        {
          subtitle: 'Age Requirements',
          text: 'PadhaKU is designed for learners of all ages. Users under 13 must have parental consent to create an account.'
        },
        {
          subtitle: 'Parental Controls',
          text: 'Parents can request access to their child\'s account data, request modifications, or delete the account by contacting support@padhaku.com.'
        },
        {
          subtitle: 'Limited Data Collection',
          text: 'For users under 13, we collect only essential information (name, email, learning progress) and do not share data with third parties except as required for platform functionality.'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      {/* SHARED NAVBAR */}
      <SharedNavbar 
        isDark={isDark}
        setIsDark={setIsDark}
        activeSection="privacy"
        showNavItems={true}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(56, 123, 255, 0.1) 0%, transparent 70%)',
            top: '-10%',
            left: '-5%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(92, 86, 255, 0.08) 0%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="privacy-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 123, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#privacy-grid)" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative pt-40 pb-32 px-8 bg-gradient-to-r from-[#0a2463] via-[#2563eb] to-[#4a4ab0] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Shield className="w-5 h-5 text-cyan-300" />
              <span className="text-white font-semibold">Privacy Policy</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
              Your Privacy Matters
            </h1>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
            </p>
            
            <div className="mt-6 text-sm text-white/60">
              Last Updated: December 6, 2025
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-8">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} p-3.5 shadow-lg`}>
                    <section.icon className="w-full h-full text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div className="space-y-6">
                  {section.content.map((item, itemIdx) => (
                    <div key={itemIdx} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-3xl border border-blue-200/50 dark:border-blue-700/50 shadow-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="px-6 py-3 rounded-full bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Email: support@padhaku.com
                </span>
              </div>
              <div className="px-6 py-3 rounded-full bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Response Time: Within 48 hours
                </span>
              </div>
            </div>
          </motion.div>

          {/* Changes Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Changes to This Privacy Policy
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. 
              We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date. 
              Your continued use of PadhaKU after changes are posted constitutes acceptance of the updated Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-8 px-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 PadhaKU - Learning, Reimagined for Everyone. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
