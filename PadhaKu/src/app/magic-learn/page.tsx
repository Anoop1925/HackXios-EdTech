"use client"

import { useState, useRef, useEffect } from 'react'
import { Sparkles, Hand, ImageIcon, BookOpen, Camera, Upload, Play, Square, Trash2, Search, Wand2, Info, CheckCircle2, AlertCircle, Pencil, Eraser, Move, HelpCircle, X, Video, Sun, Moon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import Image from 'next/image'
import { Hands, Results } from '@mediapipe/hands'
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { HAND_CONNECTIONS } from '@mediapipe/hands'

// Railway backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL || 'https://magic-learn-production.up.railway.app';

export default function MagicLearnPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'drawinair' | 'imagereader' | 'plotcrafter'>('about')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Heartbeat to keep backend alive - FIXED to properly stop on unmount
  useEffect(() => {
    let heartbeatInterval: NodeJS.Timeout | null = null;
    let isActive = true; // Track if component is still mounted

    // Only send heartbeat if component is active
    const sendHeartbeat = async () => {
      if (!isActive) return;
      
      try {
        await fetch('/api/magic-learn/start', {
          method: 'PUT',
        });
        console.log('Heartbeat sent at', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Heartbeat failed:', error);
      }
    };

    // Start heartbeat interval (every 5 seconds)
    heartbeatInterval = setInterval(sendHeartbeat, 5000);
    console.log('Magic Learn heartbeat started');

    // Cleanup function - THIS ACTUALLY RUNS when component unmounts
    return () => {
      console.log('Magic Learn component unmounting - stopping heartbeat');
      isActive = false;
      
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
      
      // Backend will auto-stop after 60 seconds of no heartbeat
      console.log('Heartbeat stopped. Backend will auto-stop in 60 seconds.');
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Theme Toggle Button - Floating Top Right */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          theme === 'dark' 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-indigo-600 hover:bg-gray-50'
        }`}
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {theme === 'light' ? (
          <Moon className="h-6 w-6" />
        ) : (
          <Sun className="h-6 w-6" />
        )}
      </button>

      {/* Hero Section - App Store Style Layout */}
      <div className={`py-12 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Large Logo */}
            <div className="md:col-span-3 flex items-center justify-start">
              <Image
                src={theme === 'dark' ? '/Magic-learn_dark.png' : '/Magic-learn_light.png'}
                alt="Magic Learn Logo"
                width={450}
                height={150}
                className="w-full h-auto max-w-[280px]"
                priority
              />
            </div>

            {/* Right: Information Cards */}
            <div className="md:col-span-9 space-y-4 flex flex-col justify-center">
              {/* Main Description */}
              <div>
                <h1 className={`text-4xl font-bold mb-3 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Magic Learn
                </h1>
                <p className={`text-lg mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  AI-powered learning tools that transform the way you interact with education
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Rating/Score Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <Sparkles className={`h-4 w-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  </div>
                  <p className={`text-xs font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    AI-Powered
                  </p>
                </div>

                {/* Category Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Education
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Category
                  </p>
                </div>

                {/* Tools Count Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    3 Tools
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Available
                  </p>
                </div>

                {/* Technology Card */}
                <div className={`rounded-xl p-4 border transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-gray-900 border-gray-800' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    PadhaKU
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Powered By
                  </p>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-indigo-900/30 text-indigo-300 border border-indigo-800' 
                    : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}>
                  Hand Gesture Recognition
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-800' 
                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                }`}>
                  Image Analysis
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-pink-900/30 text-pink-300 border border-pink-800' 
                    : 'bg-pink-100 text-pink-700 border border-pink-200'
                }`}>
                  Story Generation
                </span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  Real-Time Processing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`sticky top-0 z-10 shadow-sm transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-0">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === 'about'
                  ? theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Info className="h-4 w-4" />
              About
              {activeTab === 'about' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('drawinair')}
              className={`flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === 'drawinair'
                  ? theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Hand className="h-4 w-4" />
              DrawInAir
              {activeTab === 'drawinair' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('imagereader')}
              className={`flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === 'imagereader'
                  ? theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              Image Reader
              {activeTab === 'imagereader' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('plotcrafter')}
              className={`flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all relative ${
                activeTab === 'plotcrafter'
                  ? theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Plot Crafter
              {activeTab === 'plotcrafter' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {activeTab === 'about' && <AboutContent theme={theme} />}
        {activeTab === 'drawinair' && <DrawInAirTab theme={theme} />}
        {activeTab === 'imagereader' && <ImageReaderTab theme={theme} />}
        {activeTab === 'plotcrafter' && <PlotCrafterTab theme={theme} />}
      </div>
    </div>
  )
}

function AboutContent({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className={`rounded-xl p-8 border transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-900/50'
          : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className={`h-6 w-6 transition-colors duration-300 ${
            theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
          }`} />
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to Magic Learn
          </h2>
        </div>
        <p className={`leading-relaxed mb-4 transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Magic Learn combines cutting-edge AI with intuitive interfaces to create three powerful learning tools.
          Whether you're solving math problems through gestures, analyzing images, or crafting stories, Magic Learn
          makes learning interactive and fun.
        </p>
        <p className={`text-sm transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Use the tabs above to explore each feature and start your interactive learning journey!
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800 hover:border-purple-800'
            : 'bg-white border-gray-200'
        }`}>
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-3 w-fit mb-4">
            <Hand className="h-6 w-6 text-white" />
          </div>
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            DrawInAir
          </h3>
          <p className={`text-sm mb-4 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Draw mathematical equations and diagrams in the air using hand gestures. AI analyzes and solves them in real-time.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Gesture-based drawing
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Real-time equation solving
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Step-by-step explanations
              </span>
            </li>
          </ul>
        </div>

        <div className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800 hover:border-blue-800'
            : 'bg-white border-gray-200'
        }`}>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg p-3 w-fit mb-4">
            <ImageIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Image Reader
          </h3>
          <p className={`text-sm mb-4 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Upload any image and get detailed AI-powered analysis with custom instructions for specific insights.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Comprehensive image analysis
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Custom analysis instructions
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Educational insights
              </span>
            </li>
          </ul>
        </div>

        <div className={`rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800 hover:border-pink-800'
            : 'bg-white border-gray-200'
        }`}>
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-3 w-fit mb-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Plot Crafter
          </h3>
          <p className={`text-sm mb-4 transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Learn educational topics through engaging story narratives with AI-generated 16:9 visualizations.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Educational topic visualization
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Concept explanation narratives
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Learning through storytelling
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* How It Works */}
      <div className={`rounded-xl p-8 border shadow-sm transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'
            }`}>
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                1
              </span>
            </div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Choose Your Tool
            </h3>
            <p className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Select from DrawInAir, Image Reader, or Plot Crafter based on your learning needs
            </p>
          </div>
          <div className="text-center">
            <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                2
              </span>
            </div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Interact with AI
            </h3>
            <p className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Use gestures, upload images, or input themes to interact with our AI-powered tools
            </p>
          </div>
          <div className="text-center">
            <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'bg-pink-900/30' : 'bg-pink-100'
            }`}>
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
              }`}>
                3
              </span>
            </div>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Get Instant Results
            </h3>
            <p className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Receive detailed analysis, solutions, or creative content powered by Gemini AI
            </p>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-xl p-6 border transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-blue-950/30 border-blue-900/50'
            : 'bg-blue-50 border-blue-100'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Info className={`h-5 w-5 transition-colors duration-300 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h3 className={`font-semibold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Requirements
            </h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Modern web browser (Chrome, Firefox, Safari)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Webcam access (for DrawInAir)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Stable internet connection
              </span>
            </li>
          </ul>
        </div>

        <div className={`rounded-xl p-6 border transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-green-950/30 border-green-900/50'
            : 'bg-green-50 border-green-100'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`h-5 w-5 transition-colors duration-300 ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            }`} />
            <h3 className={`font-semibold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Pro Tips
            </h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Ensure good lighting for DrawInAir
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Upload clear images for best analysis
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <span className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Be specific with plot themes for richer stories
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function DrawInAirTab({ theme }: { theme: 'light' | 'dark' }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentGesture, setCurrentGesture] = useState<string>('None')
  const [error, setError] = useState<string>('')
  const lastGestureRef = useRef<string>('None')
  const [showTutorial, setShowTutorial] = useState(false)
  const [showTutorialPrompt, setShowTutorialPrompt] = useState(true)
  const animationFrameRef = useRef<number | null>(null)
  const handsRef = useRef<Hands | null>(null)
  const prevPointRef = useRef<{ x: number; y: number } | null>(null)
  const isStreamingRef = useRef<boolean>(false)

  // Poll for current gesture and AUTO-TRIGGER analysis
  useEffect(() => {
    if (!isStreaming) return

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/drawinair/gesture`)
        const data = await response.json()
        if (data.success) {
          const gesture = data.gesture
          setCurrentGesture(gesture)
          
          // AUTO-TRIGGER ANALYSIS when Analyzing gesture is detected
          // Only trigger if gesture changed from non-Analyzing to Analyzing
          if (gesture === 'Analyzing' && lastGestureRef.current !== 'Analyzing' && !isAnalyzing) {
            console.log('🔍 Analyzing gesture detected! Auto-triggering analysis...')
            analyzeDrawing()
          }
          
          lastGestureRef.current = gesture
        }
      } catch (err) {
        console.error('Failed to get gesture:', err)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [isStreaming, isAnalyzing, analysisResult])

  const startCamera = async () => {
    try {
      setError('')
      
      // Get browser camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 950, height: 550, facingMode: 'user' } 
      })
      
      if (!videoRef.current || !canvasRef.current || !overlayCanvasRef.current || !drawingCanvasRef.current) {
        throw new Error('Video elements not ready')
      }
      
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setIsStreaming(true)
      isStreamingRef.current = true

      // Initialize CLIENT-SIDE MediaPipe Hands (NO BACKEND DELAYS!)
      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      })
      
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      })

      hands.onResults((results: Results) => {
        if (!overlayCanvasRef.current || !drawingCanvasRef.current) return

        const overlayCanvas = overlayCanvasRef.current
        const overlayCtx = overlayCanvas.getContext('2d')
        const drawingCanvas = drawingCanvasRef.current
        const drawingCtx = drawingCanvas.getContext('2d')
        
        if (!overlayCtx || !drawingCtx) return

        // Clear overlay
        overlayCtx.clearRect(0, 0, 950, 550)

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          for (const landmarks of results.multiHandLandmarks) {
            // Mirror the overlay canvas to match video
            overlayCtx.save()
            overlayCtx.scale(-1, 1)
            overlayCtx.translate(-950, 0)
            
            // Draw hand skeleton
            drawConnectors(overlayCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 })
            drawLandmarks(overlayCtx, landmarks, { color: '#FF0000', lineWidth: 1, radius: 3 })

            // Draw yellow circles on fingertips
            const fingertips = [4, 8, 12, 16, 20]
            fingertips.forEach(idx => {
              const landmark = landmarks[idx]
              const x = landmark.x * 950
              const y = landmark.y * 550
              overlayCtx.beginPath()
              overlayCtx.arc(x, y, 12, 0, 2 * Math.PI)
              overlayCtx.strokeStyle = 'rgba(0, 200, 255, 0.8)'
              overlayCtx.lineWidth = 2
              overlayCtx.stroke()
            })
            
            overlayCtx.restore()

            // Gesture detection (use mirrored coordinates for drawing)
            const fingers = [0, 0, 0, 0, 0]
            
            // Thumb (flip logic for mirroring)
            if (landmarks[4].x > landmarks[3].x) fingers[0] = 1
            
            // Other fingers
            for (let i = 1; i <= 4; i++) {
              const tipIdx = 4 * i + 4
              const pipIdx = 4 * i + 2
              if (landmarks[tipIdx].y < landmarks[pipIdx].y) fingers[i] = 1
            }

            const indexTip = landmarks[8]
            const middleTip = landmarks[12]
            const pinkyTip = landmarks[20]

            // Analyze: Index + Middle (NO thumb)
            if (fingers[0] === 0 && fingers[1] === 1 && fingers[2] === 1 && fingers[3] === 0 && fingers[4] === 0) {
              setCurrentGesture('Analyzing')
              prevPointRef.current = null
              // Trigger analysis
              if (lastGestureRef.current !== 'Analyzing') {
                analyzeDrawing()
              }
            }
            // Drawing: Thumb + Index (mirror X coordinate)
            else if (fingers[0] === 1 && fingers[1] === 1 && fingers[2] === 0) {
              setCurrentGesture('Drawing')
              const x = (1 - indexTip.x) * 950  // Mirror X
              const y = indexTip.y * 550
              
              if (prevPointRef.current) {
                drawingCtx.beginPath()
                drawingCtx.moveTo(prevPointRef.current.x, prevPointRef.current.y)
                drawingCtx.lineTo(x, y)
                drawingCtx.strokeStyle = '#3B82F6'
                drawingCtx.lineWidth = 3
                drawingCtx.stroke()
              }
              prevPointRef.current = { x, y }
            }
            // Erasing: Thumb + Middle (use clearRect instead of black stroke)
            else if (fingers[0] === 1 && fingers[2] === 1 && fingers[1] === 0) {
              setCurrentGesture('Erasing')
              const x = (1 - middleTip.x) * 950  // Mirror X
              const y = middleTip.y * 550
              
              // Erase by clearing a circle area (transparent)
              drawingCtx.save()
              drawingCtx.globalCompositeOperation = 'destination-out'
              drawingCtx.beginPath()
              drawingCtx.arc(x, y, 15, 0, 2 * Math.PI)
              drawingCtx.fill()
              drawingCtx.restore()
              
              prevPointRef.current = { x, y }
            }
            // Clear: Thumb + Pinky
            else if (fingers[0] === 1 && fingers[4] === 1 && fingers[1] === 0 && fingers[2] === 0) {
              setCurrentGesture('Clearing')
              drawingCtx.clearRect(0, 0, 950, 550)
              prevPointRef.current = null
            }
            else {
              setCurrentGesture('None')
              prevPointRef.current = null
            }
            
            lastGestureRef.current = currentGesture || 'None'
          }
        } else {
          setCurrentGesture('None')
          prevPointRef.current = null
        }
      })

      handsRef.current = hands

      // Process at 60 FPS (INSTANT - NO NETWORK!)
      const processFrame = async () => {
        if (!isStreamingRef.current || !videoRef.current || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Draw mirrored video
        ctx.save()
        ctx.scale(-1, 1)
        ctx.translate(-950, 0)
        ctx.drawImage(videoRef.current, 0, 0, 950, 550)
        ctx.restore()

        // Send to MediaPipe
        if (handsRef.current && videoRef.current.videoWidth > 0) {
          await handsRef.current.send({ image: videoRef.current })
        }

        animationFrameRef.current = requestAnimationFrame(processFrame)
      }

      processFrame()
      
    } catch (err: any) {
      console.error('Camera error:', err)
      setError(err.message || 'Failed to start camera')
      setIsStreaming(false)
      isStreamingRef.current = false
    }
  }

  const stopCamera = async () => {
    try {
      setIsStreaming(false)
      isStreamingRef.current = false
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      
      // Close MediaPipe
      if (handsRef.current) {
        handsRef.current.close()
        handsRef.current = null
      }
      
      prevPointRef.current = null
      
      // Reset refs
      isProcessingRef.current = false
      processedImageRef.current = null
      
      // Stop browser camera
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      
      // Notify backend
      await fetch(`${BACKEND_URL}/api/drawinair/stop`, {
        method: 'POST'
      })
      
    } catch (err) {
      console.error('Error stopping camera:', err)
    } finally {
      setIsStreaming(false)
      setCurrentGesture('None')
      setAnalysisResult('')
      setError('')
    }
  }

  const analyzeDrawing = async () => {
    if (isAnalyzing || !drawingCanvasRef.current) return

    setIsAnalyzing(true)
    setError('')
    
    try {
      console.log('📤 Sending drawing for analysis...')
      
      // Get drawing canvas as base64
      const drawingCanvas = drawingCanvasRef.current
      const drawingData = drawingCanvas.toDataURL('image/png')
      
      const response = await fetch(`${BACKEND_URL}/api/drawinair/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: drawingData })
      })

      const data = await response.json()
      console.log('📥 Analysis response:', data)
      
      if (data.success) {
        setAnalysisResult(data.result)
        console.log('✅ Analysis successful!')
      } else {
        setError(data.error || 'Analysis failed')
        console.error('❌ Analysis failed:', data.error)
      }
    } catch (err) {
      console.error('❌ Analysis error:', err)
      setError('Failed to analyze drawing')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearCanvas = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/drawinair/clear`, {
        method: 'POST'
      })
      setAnalysisResult('')
    } catch (err) {
      console.error('Error clearing canvas:', err)
    }
  }

  const captureAndAnalyze = async () => {
    // Not needed anymore - gestures handle this automatically
    await analyzeDrawing()
  }

  return (
    <div className="space-y-6 relative">
      {/* Tutorial Prompt Dialog - Shows on first visit */}
      {showTutorialPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-8 max-w-md w-full shadow-2xl transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'
              }`}>
                <HelpCircle className={`h-8 w-8 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome to DrawInAir!
              </h3>
              <p className={`mb-6 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Would you like to watch a quick tutorial to learn how to use hand gestures for drawing?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowTutorialPrompt(false)
                    setShowTutorial(true)
                  }}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Yes, Show Tutorial
                </button>
                <button
                  onClick={() => setShowTutorialPrompt(false)}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors font-medium ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Overlay Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className={`sticky top-0 z-10 p-8 pb-4 border-b transition-colors duration-300 ${
              theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hand className={`h-8 w-8 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <h2 className={`text-3xl font-bold transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    DrawInAir Tutorial
                  </h2>
                </div>
                <button
                  onClick={() => setShowTutorial(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`h-6 w-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </button>
              </div>
            </div>

            <div className="p-8 pt-6">
              {/* Video Placeholder */}
              <div className="mb-8 bg-gray-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Tutorial Video</p>
                  <p className="text-sm text-gray-400 mt-2">(Video will be added here)</p>
                </div>
              </div>

              {/* Gesture Cards */}
              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Hand Gesture Controls
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Example Gesture Card - Will be replaced with actual images */}
                  <div className={`rounded-xl p-6 border-2 transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border-purple-800'
                      : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
                  }`}>
                    <div className={`rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <img
                        src="c:\Users\panup\Downloads\image (6).png"
                        alt="Gesture Example"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23E5E7EB" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239CA3AF" font-family="system-ui" font-size="14"%3EGesture Image%3C/text%3E%3C/svg%3E'
                        }}
                      />
                    </div>
                    <h4 className={`font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Draw
                    </h4>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Thumb + Index Finger
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Move your index finger to draw purple lines on the canvas
                    </p>
                  </div>

                  {/* Placeholder cards for other gestures */}
                  <div className={`rounded-xl p-6 border-2 transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-gray-900 to-slate-900 border-gray-700'
                      : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200'
                  }`}>
                    <div className={`rounded-lg h-48 mb-4 flex items-center justify-center transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <Eraser className={`h-16 w-16 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <h4 className={`font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Erase
                    </h4>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Thumb + Middle Finger
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Use middle finger to erase parts of your drawing
                    </p>
                  </div>

                  <div className={`rounded-xl p-6 border-2 transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-950/50 to-cyan-950/50 border-blue-800'
                      : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                  }`}>
                    <div className={`rounded-lg h-48 mb-4 flex items-center justify-center transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <Move className={`h-16 w-16 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-blue-500' : 'text-blue-400'
                      }`} />
                    </div>
                    <h4 className={`font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Move
                    </h4>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Thumb + Index + Middle
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Navigate without drawing any lines on canvas
                    </p>
                  </div>

                  <div className={`rounded-xl p-6 border-2 transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-red-950/50 to-pink-950/50 border-red-800'
                      : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
                  }`}>
                    <div className={`rounded-lg h-48 mb-4 flex items-center justify-center transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <Trash2 className={`h-16 w-16 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-red-500' : 'text-red-400'
                      }`} />
                    </div>
                    <h4 className={`font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Clear Canvas
                    </h4>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Thumb + Pinky Finger
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Clear the entire canvas and start fresh
                    </p>
                  </div>

                  <div className={`rounded-xl p-6 border-2 transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-green-950/50 to-emerald-950/50 border-green-800'
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                  }`}>
                    <div className={`rounded-lg h-48 mb-4 flex items-center justify-center transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      <Search className={`h-16 w-16 transition-colors duration-300 ${
                        theme === 'dark' ? 'text-green-500' : 'text-green-400'
                      }`} />
                    </div>
                    <h4 className={`font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Analyze
                    </h4>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Index + Middle Finger
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      AI analyzes your drawing and provides solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center pb-4">
                <button
                  onClick={() => setShowTutorial(false)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Got it, Let's Start!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tutorial Button - Smaller with different icon */}
      {!showTutorialPrompt && !showTutorial && (
        <button
          onClick={() => setShowTutorial(true)}
          className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-110"
          title="Watch Tutorial"
        >
          <Info className="h-5 w-5" />
        </button>
      )}

      {/* Header */}
      <div className={`rounded-xl p-6 text-white transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800'
          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <Hand className="h-6 w-6" />
          <h2 className="text-2xl font-bold">DrawInAir - Hand Gesture Drawing</h2>
        </div>
        <p className="text-white/90">Draw equations and diagrams in the air using hand gestures, then get instant AI-powered analysis and solutions.</p>
      </div>

      {/* Instructions Section - 2 Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - How to Use + What You Can Draw (stacked) */}
        <div className="space-y-6">
          {/* How to Use DrawInAir */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Info className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              How to Use DrawInAir
            </h3>
            <div className="space-y-3 text-sm">
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-indigo-950/30 border-indigo-900/50'
                  : 'bg-indigo-50 border-indigo-100'
              }`}>
                <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Start Your Camera
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Click the "Start Camera" button to enable hand tracking
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-950/30 border-purple-900/50'
                  : 'bg-purple-50 border-purple-100'
              }`}>
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Draw with Gestures
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Use hand gestures to draw equations or diagrams in the air
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-green-950/30 border-green-900/50'
                  : 'bg-green-50 border-green-100'
              }`}>
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Get AI Analysis
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Show Index + Middle fingers to analyze and get solutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You Can Draw & Solve */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              What You Can Draw & Solve
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className={`p-5 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-950/30 border-purple-900/50'
                  : 'bg-purple-50 border-purple-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-900'
                }`}>
                  Math Equations
                </span>
              </div>
              <div className={`p-5 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-950/30 border-blue-900/50'
                  : 'bg-blue-50 border-blue-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
                }`}>
                  Geometry
                </span>
              </div>
              <div className={`p-5 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-green-950/30 border-green-900/50'
                  : 'bg-green-50 border-green-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-900'
                }`}>
                  Diagrams
                </span>
              </div>
              <div className={`p-5 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-orange-950/30 border-orange-900/50'
                  : 'bg-orange-50 border-orange-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-900'
                }`}>
                  Formulas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Hand Gesture Controls (full height) */}
        <div className={`rounded-xl border shadow-sm p-6 flex flex-col transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-6 flex items-center gap-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Hand className={`h-5 w-5 transition-colors duration-300 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`} />
            Hand Gesture Controls
          </h3>
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-purple-950/30 border-purple-900/50'
                : 'bg-purple-50 border-purple-100'
            }`}>
              <Pencil className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Thumb + Index: Draw
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Move your index finger to create purple lines
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <Eraser className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Thumb + Middle: Erase
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Remove parts of your drawing with middle finger
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-blue-950/30 border-blue-900/50'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <Move className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Thumb + Index + Middle: Move
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Navigate without drawing any lines
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-red-950/30 border-red-900/50'
                : 'bg-red-50 border-red-200'
            }`}>
              <Trash2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Thumb + Pinky: Clear
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Clear the entire canvas instantly
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-green-950/30 border-green-900/50'
                : 'bg-green-50 border-green-200'
            }`}>
              <Search className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Index + Middle: Analyze
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Get AI-powered analysis and solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted Grid for bigger camera */}
      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
        {/* Left Column - Camera Feed (Wider) */}
        <div className="space-y-4">
          <div className={`rounded-xl border shadow-sm p-4 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold flex items-center gap-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Camera className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                Live Camera with Hand Tracking
              </h3>
              <div className="flex gap-2">
                {!isStreaming ? (
                  <button
                    onClick={startCamera}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Play className="h-4 w-4" />
                    Start Camera
                  </button>
                ) : (
                  <>
                    <button
                      onClick={analyzeDrawing}
                      disabled={isAnalyzing}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearCanvas}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear
                    </button>
                    <button
                      onClick={stopCamera}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Square className="h-4 w-4" />
                      Stop
                    </button>
                  </>
                )}
              </div>
            </div>

            {error && (
              <div className={`mb-4 p-3 border rounded-lg flex items-start gap-2 transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-red-950/30 border-red-900/50'
                  : 'bg-red-50 border-red-200'
              }`}>
                <AlertCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-800'
                }`}>
                  {error}
                </p>
              </div>
            )}

            <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ minHeight: '550px' }}>
              <video ref={videoRef} className="hidden" autoPlay playsInline muted />
              
              {/* Layer 1: Raw video at 60 FPS */}
              <canvas 
                ref={canvasRef} 
                width={950} 
                height={550} 
                className="w-full h-auto"
                style={{ display: isStreaming ? 'block' : 'none' }}
              />
              
              {/* Layer 2: User drawings */}
              <canvas 
                ref={drawingCanvasRef} 
                width={950} 
                height={550} 
                className="w-full h-auto absolute top-0 left-0 pointer-events-none"
                style={{ display: isStreaming ? 'block' : 'none' }}
              />
              
              {/* Layer 3: Hand tracking overlay */}
              <canvas 
                ref={overlayCanvasRef} 
                width={950} 
                height={550} 
                className="w-full h-auto absolute top-0 left-0 pointer-events-none"
                style={{ display: isStreaming ? 'block' : 'none' }}
              />
              
              {!isStreaming && (
                <div className="flex items-center justify-center h-[550px] text-gray-400">
                  <div className="text-center">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Click "Start Camera" to begin</p>
                  </div>
                </div>
              )}
              
              {isStreaming && currentGesture && currentGesture !== 'None' && (
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  {currentGesture === 'Drawing' && <Pencil className="h-5 w-5 text-purple-400" />}
                  {currentGesture === 'Erasing' && <Eraser className="h-5 w-5 text-gray-400" />}
                  {currentGesture === 'Moving' && <Move className="h-5 w-5 text-blue-400" />}
                  {currentGesture === 'Clearing' && <Trash2 className="h-5 w-5 text-red-400" />}
                  {currentGesture === 'Analyzing' && <Search className="h-5 w-5 text-green-400" />}
                  <span className="font-medium">{currentGesture}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Analysis Results */}
        <div className="space-y-4">
          {/* Analysis Result Container */}
          <div className={`rounded-xl border shadow-sm p-6 min-h-[300px] transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <Search className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              <h3 className={`font-semibold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                AI Analysis Result
              </h3>
            </div>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className={`animate-spin rounded-full h-12 w-12 border-4 mb-4 transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'border-indigo-900 border-t-indigo-400'
                    : 'border-indigo-200 border-t-indigo-600'
                }`} />
                <p className={`transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Analyzing your drawing...
                </p>
              </div>
            ) : analysisResult ? (
              <div className={`prose prose-sm max-w-none transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({node, ...props}) => <h1 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} {...props} />,
                    h2: ({node, ...props}) => <h2 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} {...props} />,
                    h3: ({node, ...props}) => <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} {...props} />,
                    p: ({node, ...props}) => <p className={`mb-3 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} {...props} />,
                    strong: ({node, ...props}) => <strong className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} {...props} />,
                    em: ({node, ...props}) => <em className={`italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} {...props} />,
                    code: ({node, ...props}) => <code className={`px-2 py-1 rounded text-sm font-mono ${theme === 'dark' ? 'bg-gray-800 text-indigo-300' : 'bg-gray-100 text-indigo-600'}`} {...props} />,
                  }}
                >
                  {analysisResult}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className={`h-16 w-16 mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
                }`} />
                <p className={`mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No analysis yet
                </p>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Use <strong>Index + Middle</strong> gesture to analyze your drawing
                </p>
              </div>
            )}
          </div>

          {/* Bottom Row - 3 Containers */}
          <div className="grid grid-cols-3 gap-4">
            {/* Quick Tips */}
            <div className={`rounded-xl border p-5 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-amber-950/30 border-amber-900/50'
                : 'bg-amber-50 border-amber-100'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Info className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                }`} />
                <h4 className={`font-semibold text-base transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Quick Tips
                </h4>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Ensure good lighting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Draw clearly and slowly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Keep hand visible
                  </span>
                </li>
              </ul>
            </div>

            {/* AI Capabilities */}
            <div className={`rounded-xl border p-5 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-indigo-950/30 border-indigo-900/50'
                : 'bg-indigo-50 border-indigo-100'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                <h4 className={`font-semibold text-base transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  AI Capabilities
                </h4>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Solves math equations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Recognizes drawings
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Step-by-step solutions
                  </span>
                </li>
              </ul>
            </div>

            {/* Best Practices */}
            <div className={`rounded-xl border p-5 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-purple-950/30 border-purple-900/50'
                : 'bg-purple-50 border-purple-100'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <h4 className={`font-semibold text-base transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Best Practices
                </h4>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Use clear gestures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Position hand properly
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Draw at steady pace
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageReaderTab({ theme }: { theme: 'light' | 'dark' }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [instructions, setInstructions] = useState('')
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        setAnalysisResult('')
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!uploadedImage) return

    setIsAnalyzing(true)
    setError('')
    
    try {
      const base64Data = uploadedImage.split(',')[1]
      const mimeType = uploadedImage.split(':')[1].split(';')[0]

      const response = await fetch(`${BACKEND_URL}/api/image-reader/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: base64Data,
          mimeType,
          instructions
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setAnalysisResult(data.result)
      } else {
        setError(data.error || 'Analysis failed')
      }
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze image. Make sure backend is running on port 5000.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const exampleInstructions = [
    "Explain the mathematical concepts shown",
    "Identify and describe all objects in the image",
    "Extract and explain any text present",
    "Describe the diagram and its components"
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl p-6 text-white transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900'
          : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <ImageIcon className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Image Reader - AI Analysis</h2>
        </div>
        <p className="text-white/90">Upload any image and get detailed AI-powered analysis with custom instructions.</p>
      </div>

      {/* Instructions Section - 2 Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - How to Use + What AI Can Analyze */}
        <div className="space-y-6">
          {/* How to Use Image Reader */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Info className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
              How to Use Image Reader
            </h3>
            <div className="space-y-3 text-sm">
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-emerald-950/30 border-emerald-900/50'
                  : 'bg-emerald-50 border-emerald-100'
              }`}>
                <div className="bg-emerald-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Upload Your Image
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Click to upload JPG or PNG images
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-teal-950/30 border-teal-900/50'
                  : 'bg-teal-50 border-teal-100'
              }`}>
                <div className="bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Add Instructions (Optional)
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Specify what you want to analyze or understand
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-green-950/30 border-green-900/50'
                  : 'bg-green-50 border-green-100'
              }`}>
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Get AI Analysis
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Receive detailed explanations and insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What AI Can Analyze */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              What AI Can Analyze
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-emerald-950/30 border-emerald-900/50'
                  : 'bg-emerald-50 border-emerald-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-emerald-300' : 'text-emerald-900'
                }`}>
                  Math Equations
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-teal-950/30 border-teal-900/50'
                  : 'bg-teal-50 border-teal-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-teal-300' : 'text-teal-900'
                }`}>
                  Diagrams
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-cyan-950/30 border-cyan-900/50'
                  : 'bg-cyan-50 border-cyan-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-cyan-300' : 'text-cyan-900'
                }`}>
                  Text Extraction
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-green-950/30 border-green-900/50'
                  : 'bg-green-50 border-green-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-900'
                }`}>
                  Objects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pro Tips */}
        <div className={`rounded-xl border shadow-sm p-6 flex flex-col transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-6 flex items-center gap-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Sparkles className={`h-5 w-5 transition-colors duration-300 ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            Pro Tips for Best Results
          </h3>
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-emerald-950/30 border-emerald-900/50'
                : 'bg-emerald-50 border-emerald-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Use High-Quality Images
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Clear, well-lit images produce better analysis results
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-teal-950/30 border-teal-900/50'
                : 'bg-teal-50 border-teal-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Be Specific with Instructions
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Detailed instructions help AI focus on what matters
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-cyan-950/30 border-cyan-900/50'
                : 'bg-cyan-50 border-cyan-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Ensure Text is Readable
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Make sure any text in images is clearly visible
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-green-950/30 border-green-900/50'
                : 'bg-green-50 border-green-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Try Example Instructions
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Use provided examples as templates for your queries
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-lime-950/30 border-lime-900/50'
                : 'bg-lime-50 border-lime-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-lime-400' : 'text-lime-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Supports Educational Content
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Perfect for analyzing study materials and diagrams
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted Grid */}
      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
        {/* Left Column - Upload & Preview (Wider) */}
        <div className="space-y-4">
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Upload className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              Upload Image
            </h3>

            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-gray-700 hover:border-indigo-600 hover:bg-indigo-950/30'
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50'
                }`}
              >
                <ImageIcon className={`h-16 w-16 mx-auto mb-4 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <p className={`mb-2 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Click to upload an image
                </p>
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  JPG, PNG supported
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`relative rounded-lg overflow-hidden border transition-colors duration-300 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-auto"
                  />
                  
                  {/* Scanner Animation Overlay - Only during analysis */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/10">
                      {/* Four Corner Brackets */}
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-indigo-500"></div>
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-indigo-500"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-indigo-500"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-indigo-500"></div>
                      
                      {/* Scanning Line Animation */}
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scan-line"></div>
                      
                      {/* Scanning Text */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 text-white px-6 py-3 rounded-lg flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span className="font-medium">Scanning Image...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!isAnalyzing && (
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Analysis Result with Markdown Rendering */}
          {analysisResult && (
            <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Search className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                <h3 className={`font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Analysis Result
                </h3>
              </div>
              <div className={`prose prose-sm max-w-none transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({node, ...props}) => <h1 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    h2: ({node, ...props}) => <h2 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    h3: ({node, ...props}) => <h3 className={`text-base font-semibold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    p: ({node, ...props}) => <p className={`mb-3 leading-relaxed transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} {...props} />,
                    strong: ({node, ...props}) => <strong className={`font-bold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    em: ({node, ...props}) => <em className={`italic transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} {...props} />,
                    code: ({node, ...props}) => <code className={`px-2 py-1 rounded text-sm font-mono transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800 text-indigo-400' : 'bg-gray-100 text-indigo-600'
                    }`} {...props} />,
                  }}
                >
                  {analysisResult}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Instructions & Controls */}
        <div className="space-y-4">
          {/* Analysis Options */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Wand2 className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              Analysis Instructions
            </h3>

            {error && (
              <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-red-950/30 border-red-900/50'
                  : 'bg-red-50 border-red-200'
              }`}>
                <AlertCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-800'
                }`}>
                  {error}
                </p>
              </div>
            )}

            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Add specific instructions for analysis (optional)..."
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              rows={4}
            />

            <button
              onClick={analyzeImage}
              disabled={!uploadedImage || isAnalyzing}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analyze Image
                </>
              )}
            </button>
          </div>

          {/* Example Instructions */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Start Examples
            </h3>
            <div className="space-y-2">
              {exampleInstructions.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setInstructions(example)}
                  className={`w-full text-left p-3 rounded-lg transition-all text-sm border ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-emerald-950/50 to-teal-950/50 hover:from-emerald-950/70 hover:to-teal-950/70 border-emerald-900/50 text-gray-300 hover:text-emerald-300'
                      : 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-emerald-100 text-gray-700 hover:text-emerald-700'
                  }`}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlotCrafterTab({ theme }: { theme: 'light' | 'dark' }) {
  const [educationalTopic, setEducationalTopic] = useState('')
  const [plotResult, setPlotResult] = useState<string>('')
  const [generatedImage, setGeneratedImage] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [error, setError] = useState<string>('')

  const generatePlot = async () => {
    if (!educationalTopic.trim()) return

    setIsGenerating(true)
    setIsGeneratingImage(true)
    setError('')
    setGeneratedImage('')
    setPlotResult('')
    
    try {
      // Generate educational visualization image first
      const imageResponse = await fetch('/api/magic-learn/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: educationalTopic })
      })

      const imageData = await imageResponse.json()
      
      if (imageData.success && imageData.imageUrl) {
        setGeneratedImage(imageData.imageUrl)
      }
      
      setIsGeneratingImage(false)
      
      // Then generate educational narrative
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout
        
        const response = await fetch(`${BACKEND_URL}/api/plot-crafter/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ theme: educationalTopic, educational: true }),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`Backend returned status ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success) {
          setPlotResult(data.result)
        } else {
          setError(data.error || 'Educational narrative generation failed')
        }
      } catch (narrativeErr: any) {
        console.error('Narrative generation error:', narrativeErr)
        if (narrativeErr.name === 'AbortError') {
          setError('Request timeout. The server took too long to respond.')
        } else if (narrativeErr.message.includes('fetch')) {
          setError('Failed to connect to backend. Make sure the Flask server is running on port 5000.')
        } else {
          setError('Failed to generate narrative. Please try again.')
        }
      }
    } catch (err) {
      console.error('Image generation error:', err)
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
      setIsGeneratingImage(false)
    }
  }

  const exampleThemes = [
    {
      title: "Physics - Refraction of Light",
      description: "How light bends when passing through different mediums"
    },
    {
      title: "Biology - Photosynthesis",
      description: "How plants convert sunlight into energy"
    },
    {
      title: "Chemistry - Water Cycle",
      description: "The continuous movement of water on Earth"
    },
    {
      title: "Mathematics - Pythagorean Theorem",
      description: "Understanding right triangles and their properties"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl p-6 text-white transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-900'
          : 'bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Plot Crafter - Educational Narratives</h2>
        </div>
        <p className="text-white/90">Learn educational topics through engaging story narratives with AI-generated visualizations.</p>
      </div>

      {/* Instructions Section - 2 Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - How to Use + What You'll Get */}
        <div className="space-y-6">
          {/* How to Use Plot Crafter */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Info className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
              }`} />
              How to Use Plot Crafter
            </h3>
            <div className="space-y-3 text-sm">
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-pink-950/30 border-pink-900/50'
                  : 'bg-pink-50 border-pink-100'
              }`}>
                <div className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Enter Educational Topic
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Choose any subject like physics, biology, chemistry, or math
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-950/30 border-purple-900/50'
                  : 'bg-purple-50 border-purple-100'
              }`}>
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Click Generate
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    AI creates a visualization and educational narrative
                  </p>
                </div>
              </div>
              <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-green-950/30 border-green-900/50'
                  : 'bg-green-50 border-green-100'
              }`}>
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Learn Through Story
                  </p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Understand concepts through engaging narrative format
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What You'll Get */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              What You'll Get
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-950/30 border-purple-900/50'
                  : 'bg-purple-50 border-purple-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-900'
                }`}>
                  16:9 Visualization
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-pink-950/30 border-pink-900/50'
                  : 'bg-pink-50 border-pink-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-pink-300' : 'text-pink-900'
                }`}>
                  Narrative Title
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-blue-950/30 border-blue-900/50'
                  : 'bg-blue-50 border-blue-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-900'
                }`}>
                  Concept Explanation
                </span>
              </div>
              <div className={`p-4 rounded-lg text-center border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-green-950/30 border-green-900/50'
                  : 'bg-green-50 border-green-100'
              }`}>
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-900'
                }`}>
                  Learning Story
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tips for Best Results */}
        <div className={`rounded-xl border shadow-sm p-6 flex flex-col transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`font-semibold mb-6 flex items-center gap-2 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <Sparkles className={`h-5 w-5 transition-colors duration-300 ${
              theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
            }`} />
            Tips for Best Results
          </h3>
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-pink-950/30 border-pink-900/50'
                : 'bg-pink-50 border-pink-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Be Specific About Topic
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Use precise terms like "Refraction of Light" instead of just "Light"
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-purple-950/30 border-purple-900/50'
                : 'bg-purple-50 border-purple-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Include Subject Area
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Specify Physics, Biology, Chemistry, or Mathematics
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-blue-950/30 border-blue-900/50'
                : 'bg-blue-50 border-blue-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Mention Grade Level
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Add context like "Middle School" or "High School" for appropriate explanations
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-green-950/30 border-green-900/50'
                : 'bg-green-50 border-green-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Add Context Details
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Include real-world applications or examples you want covered
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-amber-950/30 border-amber-900/50'
                : 'bg-amber-50 border-amber-100'
            }`}>
              <CheckCircle2 className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
              }`} />
              <div>
                <p className={`font-medium transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Try Different Topics
                </p>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Explore various concepts across different subjects for comprehensive learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted Grid */}
      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
        {/* Left Column - Input & Result (Wider) */}
        <div className="space-y-4">
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Wand2 className={`h-5 w-5 transition-colors duration-300 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              Educational Topic
            </h3>

            {error && (
              <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-red-950/30 border-red-900/50'
                  : 'bg-red-50 border-red-200'
              }`}>
                <AlertCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`} />
                <p className={`text-sm transition-colors duration-300 ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-800'
                }`}>
                  {error}
                </p>
              </div>
            )}

            <textarea
              value={educationalTopic}
              onChange={(e) => setEducationalTopic(e.target.value)}
              placeholder="Enter an educational topic... (e.g., 'Refraction of Light', 'Photosynthesis', 'Water Cycle')"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              rows={6}
            />

            <button
              onClick={generatePlot}
              disabled={!educationalTopic.trim() || isGenerating}
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  {isGeneratingImage ? 'Generating Visualization...' : 'Generating Narrative...'}
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Educational Narrative
                </>
              )}
            </button>
          </div>

          {/* Generated Educational Visualization Image */}
          {generatedImage && (
            <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <h3 className={`font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Educational Visualization
                </h3>
              </div>
              <div className="rounded-lg overflow-hidden border ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }">
                <img 
                  src={generatedImage} 
                  alt="Educational visualization" 
                  className="w-full h-auto"
                  style={{ aspectRatio: '16/9' }}
                />
              </div>
            </div>
          )}

          {/* Generated Educational Narrative with Markdown Rendering */}
          {plotResult && (
            <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className={`h-5 w-5 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />
                <h3 className={`font-semibold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Educational Narrative
                </h3>
              </div>
              <div className={`prose prose-sm max-w-none transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    h1: ({node, ...props}) => <h1 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    h2: ({node, ...props}) => <h2 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    h3: ({node, ...props}) => <h3 className={`text-base font-semibold mb-2 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    p: ({node, ...props}) => <p className={`mb-3 leading-relaxed transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} {...props} />,
                    strong: ({node, ...props}) => <strong className={`font-bold transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`} {...props} />,
                    em: ({node, ...props}) => <em className={`italic transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className={`transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`} {...props} />,
                    code: ({node, ...props}) => <code className={`px-2 py-1 rounded text-sm font-mono transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800 text-indigo-400' : 'bg-gray-100 text-indigo-600'
                    }`} {...props} />,
                  }}
                >
                  {plotResult}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Examples & Tips */}
        <div className="space-y-4">
          {/* Example Themes */}
          <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Start Examples
            </h3>
            <div className="space-y-3">
              {exampleThemes.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setEducationalTopic(example.description)}
                  className={`w-full text-left p-4 rounded-lg transition-all border ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-pink-950/50 to-purple-950/50 hover:from-pink-950/70 hover:to-purple-950/70 border-pink-900/50'
                      : 'bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 border-pink-100'
                  }`}
                >
                  <p className={`font-medium mb-1 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {example.title}
                  </p>
                  <p className={`text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {example.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
