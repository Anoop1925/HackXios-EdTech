<div align="center">

<img src="./PadhaKu/public/Main-logo2 .png" alt="PadhaKU Logo" width="400"/>

# PadhaKU - Knowledge Unlimited

### AI-Powered Adaptive Learning Platform for Computer Science Education

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Tech Stack](#tech-stack) • [Contributing](#contributing)

</div>

---

## Overview

**PadhaKU** (Hindi: "Padha" = to study, "KU" = Knowledge Unlimited) is a next-generation EdTech platform that revolutionizes computer science education through AI-powered personalization and gesture-based interaction. Built for students of all abilities, PadhaKU breaks down barriers to learning by offering adaptive courses, hands-free gesture controls, and intelligent mentoring.

### Why PadhaKU?

Traditional learning platforms follow a one-size-fits-all approach that fails to accommodate different learning paces, accessibility needs, and engagement preferences. PadhaKU addresses these critical gaps by:

- **Personalizing Education**: AI-generated courses tailored to individual learning levels and goals
- **Breaking Accessibility Barriers**: Gesture-based controls for specially-abled students
- **Gamifying Learning**: Points, leaderboards, and achievements to maintain motivation
- **Providing 24/7 Mentorship**: AI companion for instant doubt resolution and guidance
- **Making Learning Interactive**: Real-world examples and hands-on practice integrated into every lesson

---

## Features

### 1. Magic Learn - Three-in-One Learning Suite

<img src="./PadhaKu/public/Magic-learn-feature-page.png" alt="Magic Learn" width="600"/>

#### DrawInAir - Gesture-Based Drawing & Math Solver
- **Hand Tracking**: Real-time gesture recognition using MediaPipe with 21 landmark detection
- **Gesture Controls**:
  - Index + Thumb: Draw with precision
  - Index + Middle + Thumb: Move without drawing
  - Thumb + Ring: Erase mistakes
  - Thumb + Pinky: Clear entire canvas
  - Index + Middle (no thumb): Analyze & solve
- **AI Analysis**: Instant mathematical problem solving with step-by-step explanations
- **Accessibility**: Perfect for specially-abled students who find traditional input devices challenging
- **Performance**: Optimized for 30 FPS smooth tracking with gesture locking to prevent accidental switches

#### Image Reader - Visual Learning Assistant
- **Upload & Analyze**: Drop any educational image for instant AI analysis
- **Custom Instructions**: Guide the AI with specific questions about the image
- **Multi-Format Support**: Works with diagrams, charts, code screenshots, and mathematical expressions
- **Gemini 2.5 Flash**: Powered by Google's latest multimodal AI for accurate interpretations

#### PlotCrafter - Concept Explainer
- **Real-World Examples**: Explains complex CS concepts through relatable, everyday scenarios
- **Concise Learning**: One-paragraph explanations for quick understanding
- **Interactive Language**: Conversational tone that keeps students engaged
- **No Overwhelm**: Replaces long stories with focused, digestible examples

### 2. AI Course Generator - Personalized Learning Paths

- **Smart Course Creation**: Generate complete courses on any CS topic in seconds
- **Customization Options**:
  - Course name and description
  - Difficulty level (Beginner, Intermediate, Advanced)
  - Category (Programming, Web Development, Data Science, etc.)
  - Number of chapters (2-10)
  - Video integration preference
- **Structured Content**:
  - Organized chapters with multiple subtopics
  - Comprehensive theory sections
  - Real-world examples for better understanding
  - Hands-on practice exercises
  - Embedded YouTube tutorials
- **Progress Tracking**: Visual indicators for completed chapters and subtopics
- **Gamification**: Earn points for completing courses and chapters

### 3. Interactive Quiz System - Hands-Free Testing

- **Gesture-Based Interaction**: Answer quizzes using hand gestures
- **Adaptive Hints**: Thumbs-down gesture triggers helpful hints when stuck
- **Detailed Reports**: Comprehensive performance analysis after quiz completion
- **Multiple Formats**: Support for MCQs, true/false, and coding challenges
- **Camera-Based Mode**: Complete hands-free quiz experience with gesture recognition

### 4. AI Mentor (AskSensei) - Your 24/7 Study Companion

- **Intelligent Q&A**: Ask any CS-related question and get instant, contextual answers
- **Voice Interaction**: Natural conversation using Vapi's voice AI technology
- **Code Help**: Get explanations for code snippets, debugging assistance, and best practices
- **Context Awareness**: Maintains conversation history for follow-up questions
- **Markdown Support**: Formatted code blocks, syntax highlighting, and math equations

### 5. Gamification System - Stay Motivated

- **Points Calculation**: 
  ```
  Total Points = (Courses Completed × 10) + (Chapters Completed × 5)
  ```
- **Global Leaderboard**: Compete with peers and track your ranking
- **Achievement Badges**: Unlock milestones as you progress
- **Visual Feedback**: Confetti animations and celebrations for accomplishments
- **Progress Dashboard**: View detailed statistics and learning analytics

### 6. Comprehensive Authentication

- **Secure Login**: NextAuth.js with bcrypt password hashing
- **Google OAuth**: One-click sign-in with Google accounts
- **Session Management**: JWT-based persistent sessions
- **Protected Routes**: Middleware-based authorization for secure access
- **User Profiles**: Personalized dashboards with progress tracking

---

## Demo

### Screenshots

#### Landing Page
<div align="center">
<img src="./PadhaKu/public/landing-page.png" alt="Landing Page" width="800"/>
</div>

*Modern, responsive landing page with frosted glass effects and smooth scroll navigation*

#### Magic Learn Interface
*Real-time hand gesture recognition with AI-powered analysis*

#### Course Generator
*AI-generated personalized courses with embedded videos and structured content*

#### AI Mentor Chat
*Interactive voice-enabled AI assistant for instant doubt resolution*

### Video Demo

**Watch PadhaKU in Action**: [Coming Soon]

---

## Tech Stack

### Frontend Technologies

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.19-0055FF?style=for-the-badge&logo=framer&logoColor=white)

</div>

- **Next.js 15**: Server-side rendering, API routes, and optimized performance
- **React 19**: Latest features including server components and enhanced hooks
- **TypeScript**: Type-safe development with full IntelliSense support
- **Tailwind CSS 4**: Utility-first styling with custom design system
- **Radix UI**: Accessible, unstyled component primitives
- **shadcn/ui**: Beautiful, reusable components built on Radix UI
- **Framer Motion**: Smooth animations and page transitions
- **Lucide React**: Consistent icon library

### Backend Technologies

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?style=for-the-badge&logo=flask&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24-000000?style=for-the-badge&logo=next.js&logoColor=white)

</div>

- **Next.js API Routes**: RESTful API for course management and user operations
- **Flask**: Python backend for Magic Learn features
- **NextAuth.js**: Complete authentication solution with OAuth support
- **Process Management**: Automated backend lifecycle with heartbeat monitoring

### Database & Cloud

<div align="center">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

</div>

- **PostgreSQL**: Robust relational database for structured data
- **Supabase**: Backend-as-a-Service with REST API and real-time capabilities
- **pg (node-postgres)**: Connection pooling for efficient database queries
- **Dual Connectivity**: Direct PostgreSQL + Supabase REST API for maximum reliability

### AI & Machine Learning

<div align="center">

![Google AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-Hands-FF6F00?style=for-the-badge&logo=google&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-4.x-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)

</div>

- **Google Gemini 2.5 Flash**: Advanced LLM for course generation and content analysis
- **MediaPipe Hands**: Real-time hand tracking with 21 landmark detection
- **Vapi**: Natural voice AI for conversational interactions
- **OpenCV**: Computer vision processing for video streams
- **NumPy**: Numerical computing for gesture calculations
- **Pillow**: Image processing and manipulation

### Development Tools

<div align="center">

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

</div>

- **Git**: Version control and collaboration
- **ESLint**: Code quality and consistency enforcement
- **TypeScript Compiler**: Type checking and compilation
- **npm**: Package management for JavaScript dependencies
- **pip**: Package management for Python dependencies

---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** ≥ 20.0.0 ([Download](https://nodejs.org/))
- **Python** ≥ 3.9 ([Download](https://www.python.org/))
- **PostgreSQL** ≥ 14 ([Download](https://www.postgresql.org/)) or Supabase account
- **Git** ([Download](https://git-scm.com/))
- **Google Gemini API Key** ([Get API Key](https://makersuite.google.com/app/apikey))
- **Vapi API Key** (optional, for voice features) ([Get API Key](https://vapi.ai/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/Anoop1925/PadhaKu.git
cd PadhaKu/PadhaKu
```

### Step 2: Install Dependencies

#### Frontend (Next.js)

```bash
npm install
```

#### Backend (Python for Magic Learn)

```bash
cd src/app/feature-1
pip install -r requirements.txt
```

### Step 3: Environment Configuration

Create a `.env.local` file in the `PadhaKu` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/padhaku
# OR use Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# NextAuth Configuration
NEXTAUTH_SECRET=your-random-secret-key-generate-with-openssl
NEXTAUTH_URL=http://localhost:3000

# Google Gemini API Keys (Separate keys to avoid rate limits)
DRAWINAIR_API_KEY=your-gemini-api-key-1
IMAGE_READER_API_KEY=your-gemini-api-key-2
PLOT_CRAFTER_API_KEY=your-gemini-api-key-3
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-4

# Vapi Voice AI (Optional)
VAPI_API_KEY=your-vapi-api-key
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Database Setup

#### Option A: Local PostgreSQL

```bash
# Create database
createdb padhaku

# Run migrations
psql -d padhaku -f database_schema.sql
```

#### Option B: Supabase (Recommended)

1. Create a project on [Supabase](https://supabase.com/)
2. Run the migration SQL in the Supabase SQL editor
3. Copy connection details to `.env.local`

### Step 5: Configure Python Backend

Create a `.env` file in `src/app/feature-1`:

```env
DRAWINAIR_API_KEY=your-gemini-api-key-1
IMAGE_READER_API_KEY=your-gemini-api-key-2
PLOT_CRAFTER_API_KEY=your-gemini-api-key-3
```

### Step 6: Start Development Servers

#### Terminal 1: Next.js Frontend

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Terminal 2: Python Backend (Auto-starts when needed)

The Flask backend for Magic Learn auto-starts when you click "Launch Magic Learn" in the UI. Manual start:

```bash
cd src/app/feature-1
python magic_learn_backend.py
```

Backend will run on `http://localhost:5000`

### Step 7: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

Create an account or sign in with Google to start learning!

---

## Project Structure

```
PadhaKU/
├── PadhaKu/                      # Main application directory
│   ├── public/                    # Static assets
│   │   ├── Main-logo22.png       # Primary logo
│   │   ├── App-Icon.png          # Favicon
│   │   └── ...
│   ├── src/
│   │   ├── app/                  # Next.js app directory
│   │   │   ├── page.tsx          # Root redirect to /home
│   │   │   ├── layout.tsx        # Root layout with metadata
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── home/             # Landing page
│   │   │   │   └── page.tsx      # Main landing page
│   │   │   ├── sign-in/          # Authentication
│   │   │   │   └── page.tsx      # Sign-in page
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── feature-1/        # Magic Learn
│   │   │   │   ├── page.tsx      # Magic Learn UI
│   │   │   │   ├── magic_learn_backend.py  # Flask backend
│   │   │   │   └── requirements.txt
│   │   │   ├── feature-2/        # Course Generator
│   │   │   │   ├── page.tsx      # Course list
│   │   │   │   └── [id]/         # Course viewer
│   │   │   ├── feature-3/        # Quiz System
│   │   │   ├── feature-5/        # Gamification
│   │   │   ├── ai-mentor/        # AI Companion
│   │   │   └── api/              # API routes
│   │   │       ├── auth/         # NextAuth routes
│   │   │       ├── feature-2/    # Course API
│   │   │       ├── feature-5/    # Points & leaderboard
│   │   │       └── magic-learn/  # Backend management
│   │   ├── components/           # React components
│   │   │   ├── SharedNavbar.tsx  # Unified navbar
│   │   │   ├── AuthForm.tsx      # Authentication forms
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   └── ...
│   │   ├── lib/                  # Utility functions
│   │   │   ├── db.ts             # Database connection
│   │   │   └── utils.ts          # Helper functions
│   │   └── types/                # TypeScript definitions
│   ├── database_schema.sql       # Database structure
│   ├── package.json              # Node dependencies
│   ├── tsconfig.json             # TypeScript config
│   ├── next.config.ts            # Next.js configuration
│   └── tailwind.config.ts        # Tailwind configuration
└── README.md                      # This file
```

---

## Usage Guide

### Creating Your First Course

1. **Navigate to Course Generator**: Click "Smart Course" in the navbar
2. **Fill Course Details**:
   - Enter course name (e.g., "Python for Beginners")
   - Write a brief description
   - Select difficulty level
   - Choose category
   - Set number of chapters (2-10)
   - Toggle video embedding
3. **Generate**: Click "Generate Course" and wait 10-30 seconds
4. **Learn**: Access your course from "My Courses" section

### Using Magic Learn

#### DrawInAir
1. Click "Launch Magic Learn" → "DrawInAir"
2. Allow camera access when prompted
3. Use gestures to draw math problems
4. Use Index + Middle fingers (no thumb) to analyze
5. View step-by-step solutions

#### Image Reader
1. Click "Image Reader" tab
2. Upload an image or drag & drop
3. Add custom instructions (optional)
4. Click "Analyze Image"
5. Read AI-generated insights

#### PlotCrafter
1. Click "PlotCrafter" tab
2. Enter a CS concept (e.g., "recursion")
3. Click "Generate Explanation"
4. Read the concise real-world example

### Interacting with AI Mentor

1. Navigate to "AI Mentor" from navbar
2. Type your question or click the microphone for voice input
3. Receive instant, contextual answers
4. Ask follow-up questions for deeper understanding
5. View code snippets with syntax highlighting

### Tracking Progress

- **Dashboard**: View overall statistics and recent activity
- **Leaderboard**: Check your global ranking
- **Points**: Earn points by completing chapters and courses
- **Achievements**: Unlock badges as you progress

---

## API Documentation

### Course Generation API

**Endpoint**: `POST /api/feature-2/generate-course`

**Request Body**:
```json
{
  "courseName": "Python Basics",
  "description": "Learn Python fundamentals",
  "level": "Beginner",
  "category": "Programming",
  "chapters": 5,
  "includeVideos": true
}
```

**Response**:
```json
{
  "success": true,
  "courseId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Course generated successfully"
}
```

### Magic Learn Backend API

**Base URL**: `http://localhost:5000/api`

**Endpoints**:
- `POST /drawinair/start` - Start camera
- `POST /drawinair/stop` - Stop camera
- `GET /drawinair/video-feed` - Video stream
- `POST /drawinair/analyze` - Analyze drawing
- `POST /image-reader/analyze` - Analyze image
- `POST /plot-crafter/generate` - Generate explanation

### Points System API

**Endpoint**: `POST /api/feature-5/points`

**Request Body**:
```json
{
  "userId": "user123",
  "chaptersCompleted": 5,
  "coursesCompleted": 2
}
```

---

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- Report bugs and issues
- Suggest new features
- Improve documentation
- Submit pull requests
- Star the repository

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**:
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Standards

- Follow TypeScript best practices
- Use ESLint and Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

---

## Roadmap

### Current Version: v1.0.0

- AI Course Generator
- Magic Learn Suite (DrawInAir, Image Reader, PlotCrafter)
- AI Mentor Chat
- Gamification System
- Quiz System
- Authentication & User Management

### Upcoming Features: v2.0.0

- Mobile application (React Native)
- Multi-language support
- Advanced analytics dashboard
- Collaborative learning rooms
- Personalized learning paths with ML
- Progressive Web App (PWA)
- Push notifications for deadlines
- Peer-to-peer chat system
- Certification system
- Integration with GitHub for coding challenges

---

## Troubleshooting

### Common Issues

**Issue**: Camera not detected in DrawInAir
- **Solution**: Ensure browser has camera permissions. Try a different browser (Chrome recommended).

**Issue**: Flask backend won't start
- **Solution**: Check Python version (≥3.9), verify all dependencies installed: `pip install -r requirements.txt`

**Issue**: Database connection error
- **Solution**: Verify PostgreSQL is running or Supabase credentials are correct in `.env.local`

**Issue**: Course generation taking too long
- **Solution**: Check Gemini API key validity and rate limits. Try reducing number of chapters.

**Issue**: Build errors with Next.js
- **Solution**: Delete `.next` folder and `node_modules`, then run `npm install` and `npm run dev`

---

## Performance Optimization

- **Server-Side Rendering**: Critical pages use SSR for fast initial load
- **Image Optimization**: Next.js Image component with automatic WebP conversion
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on-demand
- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: API responses cached where appropriate
- **Gesture Optimization**: Frame skipping and model complexity reduction for 30 FPS

---

## Security

- **Password Hashing**: bcrypt with salt rounds for secure credential storage
- **JWT Tokens**: Secure session management with NextAuth.js
- **Environment Variables**: Sensitive data never committed to repository
- **API Rate Limiting**: Protection against abuse
- **Input Validation**: All user inputs sanitized and validated
- **SQL Injection Prevention**: Parameterized queries throughout
- **XSS Protection**: React's built-in XSS prevention + CSP headers

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Google Gemini Team**: For providing powerful AI capabilities
- **MediaPipe Team**: For excellent hand tracking technology
- **Supabase**: For seamless backend infrastructure
- **Vercel**: For Next.js and hosting solutions
- **shadcn**: For beautiful, accessible UI components
- **Open Source Community**: For countless helpful libraries

---

## Support

### Need Help?

- Issues: [GitHub Issues](https://github.com/Anoop1925/PadhaKU/issues)

### Stay Connected

- Star us on [GitHub](https://github.com/Anoop1925/PadhaKU)

---

<div align="center">

### Made with ❤️ by the PadhaKU Team

**Empowering every student with AI-driven, accessible education**

[⬆ Back to Top](#padhaku---knowledge-unlimited)

</div>



