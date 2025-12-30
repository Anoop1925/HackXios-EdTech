# PadhaKU - Comprehensive Platform Guide

## Table of Contents
1. [Platform Overview](#platform-overview)
2. [Core Architecture](#core-architecture)
3. [Features & Technologies](#features--technologies)
4. [Technical Stack](#technical-stack)
5. [Data Flow & Processing](#data-flow--processing)
6. [Development & Deployment](#development--deployment)

---

## Platform Overview

**PadhaKU** (Knowledge Unlimited) is an AI-powered adaptive learning platform designed for all students, with special emphasis on accessibility for motor-impaired learners. The platform combines cutting-edge AI, computer vision, and gesture recognition to create an inclusive, engaging educational experience.

### Mission
Make limitless learning accessible to everyone, regardless of physical abilities, through innovative technology and personalized AI assistance.

### Target Users
- All students (high school to adult learners)
- Motor-impaired students who benefit from hands-free gesture controls
- Self-paced learners and working professionals
- Educators creating custom curriculum

---

## Core Architecture

### System Flow
```
User → Authentication → Dashboard → Feature Selection → Processing Layer → AI Services → Database → Output → User
```

### Technology Layers

**1. Frontend Layer**
- Next.js 15 with React 19
- TypeScript for type safety
- Tailwind CSS 4 for styling
- Framer Motion & Lottie for animations

**2. Backend Layer**
- Next.js API Routes (Node.js)
- Flask Backend (Python) for computer vision
- Auto-scaling with heartbeat monitoring

**3. AI & ML Services**
- Google Gemini 2.5 Flash
- MediaPipe Hands
- Vapi Voice AI

**4. Data Layer**
- PostgreSQL (direct connection)
- Supabase (REST API fallback)
- Dual connectivity for 100% reliability

---

## Features & Technologies

### 1. Magic Learn Suite

**Description**: Three-in-one hands-free learning toolset using webcam-based gesture controls.

#### DrawInAir - Gesture-Based Drawing & Math Solver

**What It Does**:
- Students draw mathematical problems in mid-air using hand gestures
- AI analyzes drawings and provides step-by-step solutions
- No keyboard or mouse required - perfect for motor-impaired students

**How It Works**:
1. User launches DrawInAir from dashboard
2. Flask backend auto-starts (pythonw process)
3. OpenCV captures webcam feed at 950x550 resolution, 30 FPS
4. MediaPipe Hands detects 21 hand landmarks in real-time
5. Gesture recognition algorithm identifies finger positions:
   - **Drawing Mode**: Index finger + Thumb (draws magenta lines)
   - **Moving Mode**: Index + Middle + Thumb (green cursor, no drawing)
   - **Erasing Mode**: Thumb + Ring finger (20px eraser)
   - **Clear Canvas**: Thumb + Pinky (instant reset)
   - **Analyze**: Index + Middle fingers (triggers AI analysis)
6. Smart gesture locking prevents accidental mode switches (3-frame consistency)
7. Drawing rendered on HTML5 canvas with anti-aliasing
8. On analyze, canvas converts to PIL Image
9. Image sent to Gemini AI with math-specific prompt
10. AI returns step-by-step solution
11. Result displayed to user
12. Backend auto-stops after 15 seconds of inactivity (heartbeat monitoring)

**Technologies**:
- **OpenCV (cv2)**: Video capture and frame processing
- **MediaPipe Hands**: 21-landmark hand tracking
- **Flask**: Python web server
- **Google Gemini 2.5 Flash**: Mathematical analysis
- **PIL (Pillow)**: Image conversion
- **HTML5 Canvas**: Drawing surface
- **NumPy**: Numerical computations for gesture detection

**Performance Optimizations**:
- Process every 2nd frame for landmark detection (saves CPU)
- Render every frame for visual smoothness
- Model complexity = 0 (lighter MediaPipe model)
- Smart gesture locking (3-frame hysteresis)
- Result: Stable 30 FPS with smooth interaction

---

#### Image Reader - Visual Learning Assistant

**What It Does**:
- Upload images of diagrams, charts, code screenshots, math expressions
- Get AI-powered analysis with custom instructions
- Supports JPEG, PNG, GIF, WebP (max 10 MB)

**How It Works**:
1. User uploads image via drag-and-drop interface
2. Optional custom instruction input (e.g., "Explain the algorithm shown")
3. Frontend sends image + instruction to Next.js API route
4. API route forwards to Gemini AI (multimodal analysis)
5. Gemini analyzes visual content with context
6. Detailed explanation returned with markdown formatting
7. Displayed with syntax highlighting for code snippets

**Technologies**:
- **Google Gemini 2.5 Flash**: Multimodal AI (text + images)
- **React Dropzone**: File upload UI
- **Next.js API Routes**: Backend processing
- **React Markdown**: Formatted output display

**Use Cases**:
- Understanding complex textbook diagrams
- Debugging code from screenshots
- Interpreting data visualizations
- Mathematical notation explanations

---

#### PlotCrafter - Concept Explainer

**What It Does**:
- Converts complex concepts into concise, real-world examples
- One-paragraph explanations (4-5 sentences max)
- Conversational, engaging language

**How It Works**:
1. User enters concept name (e.g., "recursion", "pointers", "binary search")
2. Frontend sends to Flask API endpoint `/api/plot-crafter/generate`
3. Backend constructs specialized Gemini prompt:
   - "Explain [concept] using SINGLE real-life example"
   - "ONLY ONE PARAGRAPH (maximum 4-5 sentences)"
   - "Use simple, interactive language"
   - Format: "Imagine you're [scenario]..."
4. Gemini generates concise explanation
5. Response displayed immediately

**Technologies**:
- **Google Gemini 2.5 Flash**: Text generation
- **Flask**: Backend API
- **Custom Prompt Engineering**: Ensures brevity

**Example Output**:
> "Imagine you're looking for a specific book in a library. Instead of checking every shelf, you ask the librarian who points you to the right section, then the right shelf, then the exact spot. That's binary search - you keep cutting your search space in half until you find what you need!"

---

### 2. AI Course Generator

**Description**: Democratizes education by allowing anyone to create professional-quality courses using AI.

**What It Does**:
- Generate personalized courses on any topic
- Customize difficulty (Beginner, Intermediate, Advanced)
- Choose chapter count (2-10)
- Auto-embed YouTube videos
- Track progress with visual indicators

**How It Works**:
1. User fills course creation form:
   - Course name
   - Description
   - Difficulty level
   - Category
   - Number of chapters
   - Video toggle (on/off)
2. Frontend sends POST to `/api/feature-2/generate-course`
3. Backend constructs detailed Gemini prompt with JSON schema:
   ```json
   {
     "courseName": "string",
     "chapters": [
       {
         "chapterName": "string",
         "subtopics": [
           {
             "name": "string",
             "theory": "string",
             "examples": "string",
             "handsOn": "string"
           }
         ]
       }
     ]
   }
   ```
4. Gemini generates structured course content
5. Response sanitization:
   - Remove markdown code fences
   - Extract JSON from text
   - Validate against schema
6. For each subtopic (if videos enabled):
   - Search YouTube Data API
   - Get top relevant video
   - Store video ID
7. Store complete course in PostgreSQL:
   - `id` (UUID)
   - `user_id` (owner)
   - `course_name`
   - `description`
   - `level`
   - `category`
   - `content` (JSONB column - entire course structure)
8. Return course ID
9. Frontend redirects to course viewer (`/feature-2/[id]`)
10. User navigates chapters, watches videos, reads content
11. Progress tracked in `course_progress` table
12. Points awarded on chapter/course completion

**Technologies**:
- **Google Gemini 2.5 Flash**: Course content generation
- **YouTube Data API v3**: Video search and metadata
- **PostgreSQL**: Course storage with JSONB
- **Next.js API Routes**: Backend logic
- **React Modal**: Course viewer UI
- **Framer Motion**: Smooth transitions

**Database Schema**:
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  course_name TEXT NOT NULL,
  description TEXT,
  level TEXT,
  category TEXT,
  content JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE course_progress (
  id UUID PRIMARY KEY,
  user_id TEXT,
  course_id UUID,
  chapters_completed JSONB DEFAULT '[]',
  progress_percentage INT DEFAULT 0,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

**Retry Logic**:
- 3 attempts on generation failure
- 1-second delay between retries
- User-friendly error messages with suggestions

**Success Rate**: ~95% (improved from 70% with validation layers)

---

### 3. Interactive Quiz System

**Description**: Hands-free assessment experience using gesture-based controls.

**What It Does**:
- Answer quiz questions using hand gestures
- Thumbs-down for adaptive hints
- Detailed performance reports
- Multiple question formats (MCQ, True/False, Coding)

**How It Works**:
1. User starts quiz from course or dashboard
2. Questions fetched from database or generated by AI
3. Camera mode activated (MediaPipe hand tracking)
4. Gesture recognition for answers:
   - **Option A**: One finger up
   - **Option B**: Two fingers up
   - **Option C**: Three fingers up
   - **Option D**: Four fingers up
   - **Thumbs Down**: Request hint (AI generates context-specific hint)
5. Answer validation in real-time
6. Correct/incorrect feedback with animations
7. Progress tracked throughout quiz
8. Performance report generation:
   - Score percentage
   - Time taken
   - Correct/incorrect breakdown
   - Explanations for wrong answers
9. Results stored in database
10. Points awarded for completion

**Technologies**:
- **MediaPipe Hands**: Gesture detection
- **Google Gemini**: Hint generation, question creation
- **PostgreSQL**: Quiz data and results storage
- **React State Management**: Quiz flow control
- **Framer Motion**: Feedback animations

**Adaptive Difficulty**:
- Tracks user performance in real-time
- Adjusts question difficulty based on accuracy
- More challenging questions for high performers
- Simplified questions if struggling

---

### 4. AI Mentor (AskSensei)

**Description**: 24/7 intelligent study companion with voice and text interaction.

**What It Does**:
- Natural language Q&A on any educational topic
- Voice interaction support
- Code debugging and explanations
- Context-aware conversations (remembers last 10 messages)

**How It Works**:
1. User opens AI Mentor interface
2. **Text Mode**:
   - User types question
   - Frontend sends to `/api/ai-mentor/chat`
   - Backend maintains conversation history (last 10 messages)
   - Constructs context-aware prompt for Gemini
   - Gemini generates response
   - Response formatted with markdown + syntax highlighting
   - Math equations rendered with KaTeX
3. **Voice Mode**:
   - User clicks voice button
   - Vapi voice AI SDK initializes
   - User speaks question
   - Vapi transcribes speech to text
   - Sent to Gemini for processing
   - Response generated
   - Vapi converts response to speech
   - Audio played back to user
4. Conversation history stored in session
5. Follow-up questions maintain context

**Technologies**:
- **Google Gemini 2.5 Flash**: Text-based Q&A
- **Vapi Voice AI**: Voice interactions (speech-to-text, text-to-speech)
- **React Markdown**: Response formatting
- **rehype-katex**: Math equation rendering
- **remark-gfm**: GitHub Flavored Markdown support
- **Prism.js / highlight.js**: Code syntax highlighting

**Knowledge Domains**:
- Programming languages (Python, JavaScript, Java, C++, etc.)
- Data structures and algorithms
- Web development
- Database design
- Computer science fundamentals
- Mathematics and statistics

**Context Window**:
```javascript
const conversationHistory = messages.slice(-10); // Last 10 messages
const contextPrompt = `
Previous conversation:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

Current question: ${userQuestion}
`;
```

---

### 5. Gamification System

**Description**: Maintains motivation through achievement, competition, and visual feedback.

**What It Does**:
- Points system tied to learning activities
- Global leaderboard with real-time rankings
- Achievement badges
- Confetti celebrations on milestones
- Detailed progress analytics

**How It Works**:

#### Point Calculation
**Formula**:
```
Total Points = (Courses Completed × 10) + (Chapters Completed × 5)
```

**Trigger Events**:
1. User completes a course chapter
2. Frontend sends POST to `/api/feature-5/progress`
3. Backend updates `user_progress` table:
   ```sql
   UPDATE user_progress
   SET chapters_completed = chapters_completed + 1,
       total_points = (courses_completed * 10) + ((chapters_completed + 1) * 5),
       last_updated = NOW()
   WHERE user_id = $1;
   ```
4. If full course completed:
   ```sql
   UPDATE user_progress
   SET courses_completed = courses_completed + 1,
       total_points = ((courses_completed + 1) * 10) + (chapters_completed * 5)
   WHERE user_id = $1;
   ```
5. Trigger confetti animation on frontend
6. Update leaderboard ranking

#### Leaderboard System
**Query**:
```sql
SELECT 
  u.id,
  u.name,
  u.image,
  up.total_points,
  up.chapters_completed,
  up.courses_completed,
  RANK() OVER (ORDER BY up.total_points DESC, up.chapters_completed DESC) as rank
FROM users u
JOIN user_progress up ON u.id = up.user_id
ORDER BY rank
LIMIT 100;
```

**Caching Strategy**:
- Materialized view refreshed every 5 minutes
- Real-time updates for user's own rank
- Reduces database load

**Tiebreaker Logic**:
- Primary: Total points (descending)
- Secondary: Chapters completed (descending)
- Tertiary: Earlier registration date

#### Visual Celebrations
**Confetti Animation**:
- Triggered on point milestones (50, 100, 200, 500, 1000+)
- React Confetti library
- Lasts 3 seconds
- Custom colors matching brand

**Technologies**:
- **PostgreSQL**: Progress and leaderboard data
- **Next.js API Routes**: Point calculation logic
- **React Confetti**: Celebration animations
- **Framer Motion**: Smooth rank updates
- **Materialized Views**: Performance optimization

**Database Schema**:
```sql
CREATE TABLE user_progress (
  user_id TEXT PRIMARY KEY,
  courses_completed INT DEFAULT 0,
  chapters_completed INT DEFAULT 0,
  total_points INT DEFAULT 0,
  rank INT,
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leaderboard ON user_progress(total_points DESC, chapters_completed DESC);
```

---

### 6. Mood Garden (NEW FEATURE)

**Description**: Animated visual progress tracker where a plant grows based on points earned.

**What It Does**:
- Displays a virtual garden that evolves as user earns points
- Plant growth stages reflect learning progress
- Beautiful animations create emotional connection to achievements
- Gamification through visual storytelling

**How It Works**:

#### Growth Stages
```javascript
const getGardenStage = (points) => {
  if (points < 50) return 'seed';           // Empty pot with soil
  if (points < 150) return 'sprout';        // Small green sprout
  if (points < 300) return 'small-plant';   // Growing plant with leaves
  if (points < 500) return 'growing-tree';  // Young tree with branches
  return 'full-bloom';                       // Beautiful flowering tree
};
```

#### Animation Flow
1. User dashboard loads
2. Fetch user's total points from database
3. Calculate current garden stage
4. Load appropriate Lottie animation or 3D model
5. Render animated scene:
   - Background evolution (day/night cycle based on activity)
   - Soil/pot animation
   - Plant growth with smooth transitions
   - Particle effects (sparkles, falling leaves)
   - Blooming flowers on milestones
6. Real-time updates when points change:
   - Smooth transition animation (5-10 seconds)
   - Particle burst on stage upgrade
   - Achievement popup notification
7. Interactive elements:
   - Hover to see point ranges for next stage
   - Click plant to see growth history
   - Water button (daily engagement bonus - future feature)

#### Visual Elements

**Seed Stage (0-49 points)**:
- Brown pot with dark soil
- Subtle shimmer effect on soil
- "Plant your first seeds of knowledge" message

**Sprout Stage (50-149 points)**:
- Small green shoot emerging
- Gentle swaying animation
- Soil appears moistened
- Light green glow around sprout

**Small Plant Stage (150-299 points)**:
- 3-4 leaves on stem
- Leaves sway independently
- Occasional water droplet animations
- Pot decorates with small stones

**Growing Tree Stage (300-499 points)**:
- Multiple branches
- Dense foliage
- Birds occasionally fly by
- Shadows and depth effects
- Pot upgrades to decorative planter

**Full Bloom Stage (500+ points)**:
- Majestic tree with colorful flowers
- Butterfly animations
- Falling petals
- Fruit/achievement badges hanging on branches
- Golden glow around entire garden
- Background shows sunrise/sunset

#### Technology Stack

**Option 1: 2D Animation (Recommended)**

**Primary Library: Lottie**
- **What**: JSON-based animation format
- **Why**: Lightweight, scalable, designed in After Effects
- **Library**: `lottie-react` (npm package)
- **File Size**: 50-200 KB per animation

**Implementation**:
```jsx
import Lottie from 'lottie-react';
import seedAnimation from './animations/seed.json';
import sproutAnimation from './animations/sprout.json';
// ... other stages

const MoodGarden = ({ points }) => {
  const stage = getGardenStage(points);
  const animationData = {
    seed: seedAnimation,
    sprout: sproutAnimation,
    // ... other stages
  };

  return (
    <div className="mood-garden">
      <Lottie 
        animationData={animationData[stage]}
        loop={true}
        autoplay={true}
      />
      <p>Your garden is at {stage} stage!</p>
      <ProgressBar points={points} nextStage={getNextStage(points)} />
    </div>
  );
};
```

**Additional 2D Libraries**:
- **GSAP (GreenSock)**: Advanced timeline animations, smooth transitions
- **Framer Motion**: React-native animations (already in tech stack)
- **React Spring**: Physics-based animations for natural movement

**Particle Effects**:
- **tsParticles**: Customizable particle system for sparkles, falling leaves
- **react-particles**: React wrapper for tsParticles

---

**Option 2: 3D Animation (Advanced)**

**Primary Library: Three.js + React Three Fiber**

**What**:
- Three.js: WebGL 3D library
- React Three Fiber: React renderer for Three.js

**Implementation**:
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Plant3D = ({ stage }) => {
  const { scene } = useGLTF(`/models/${stage}.glb`);
  return <primitive object={scene} />;
};

const MoodGarden3D = ({ points }) => {
  const stage = getGardenStage(points);
  
  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      <Plant3D stage={stage} />
      <OrbitControls />
    </Canvas>
  );
};
```

**3D Model Sources**:
- **Spline**: Design 3D scenes, export to React
- **Blender**: Create custom 3D models (export as .glb)
- **Sketchfab**: Download free 3D plant models

**Libraries**:
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers (lights, controls, loaders)
- **@react-three/postprocessing**: Visual effects (bloom, glow)

---

#### Recommended Implementation Strategy

**Phase 1: MVP (Start with Lottie)**
1. Create 5 Lottie animations in After Effects or LottieFiles
2. Implement basic stage system
3. Hook into existing points system
4. Add smooth transitions with Framer Motion

**Phase 2: Enhancement**
1. Add particle effects (sparkles, falling leaves)
2. Implement daily engagement features
3. Add achievement badges as fruits on tree
4. Create growth history timeline

**Phase 3: Advanced (Optional 3D)**
1. Upgrade to Three.js if performance allows
2. Add interactive camera controls
3. Seasonal themes (spring, summer, fall, winter)
4. Multiplayer garden sharing

#### Database Integration

**New Table**:
```sql
CREATE TABLE mood_garden (
  user_id TEXT PRIMARY KEY,
  current_stage TEXT NOT NULL,
  total_waterings INT DEFAULT 0,
  last_watered TIMESTAMP,
  achievement_fruits JSONB DEFAULT '[]',
  garden_theme TEXT DEFAULT 'spring',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**API Endpoints**:
- `GET /api/mood-garden/status` - Get current garden state
- `POST /api/mood-garden/water` - Daily watering (engagement bonus)
- `GET /api/mood-garden/history` - Growth timeline

#### Performance Considerations

**Optimization Techniques**:
- Lazy load animations (only load current stage)
- Use `requestAnimationFrame` for smooth 60 FPS
- Debounce point updates to prevent animation spam
- Memoize garden component with React.memo
- Use Web Workers for complex calculations

**File Size Management**:
- Compress Lottie JSON files
- Use SVG sprites for static elements
- Lazy load 3D models with Suspense
- Implement progressive loading

#### User Experience Features

**Tooltips & Guidance**:
- Hover over plant: "You're 50 points away from the next stage!"
- Progress bar showing current stage and next milestone
- Celebration modal on stage upgrade

**Accessibility**:
- Alt text for all visual elements
- Keyboard navigation support
- Screen reader announcements for stage changes
- Reduced motion option for users sensitive to animations

**Responsive Design**:
- Mobile: Simplified animations, smaller canvas
- Tablet: Medium detail level
- Desktop: Full 3D/animation effects

---

### 7. Comprehensive Authentication

**Description**: Secure user management with multiple authentication methods.

**What It Does**:
- Email/password authentication
- Google OAuth for one-click sign-in
- JWT-based session management
- Protected routes
- Personalized dashboards

**How It Works**:

#### NextAuth.js Configuration
```javascript
// pages/api/auth/[...nextauth].ts
export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // 1. Query database for user by email
        const user = await db.query('SELECT * FROM users WHERE email = $1', [credentials.email]);
        
        // 2. Verify password with bcrypt
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        // 3. Return user object if valid
        if (isValid) return { id: user.id, email: user.email, name: user.name };
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to JWT token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session
      session.user.id = token.id;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
```

#### Sign Up Flow
1. User fills registration form (name, email, password)
2. Frontend validation (email format, password strength)
3. POST to `/api/auth/signup`
4. Backend checks if email already exists
5. Hash password with bcrypt (10 salt rounds)
6. Insert user into database:
   ```sql
   INSERT INTO users (id, email, password, name, created_at)
   VALUES (gen_random_uuid(), $1, $2, $3, NOW());
   ```
7. Auto sign-in after registration
8. Redirect to dashboard

#### Sign In Flow
1. User enters credentials
2. POST to `/api/auth/signin`
3. NextAuth verifies credentials
4. Generate JWT token with user data
5. Store token in HTTP-only cookie
6. Redirect to dashboard

#### Google OAuth Flow
1. User clicks "Sign in with Google"
2. Redirect to Google OAuth consent screen
3. User approves permissions
4. Google redirects back with authorization code
5. NextAuth exchanges code for tokens
6. Fetch user profile from Google
7. Check if user exists in database:
   - Exists: Sign in
   - New: Create account with Google data
8. Generate JWT session
9. Redirect to dashboard

#### Protected Routes
**Middleware**:
```javascript
// middleware.ts
export async function middleware(req) {
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.redirect('/auth/signin');
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/feature-1/:path*', '/feature-2/:path*'],
};
```

**Technologies**:
- **NextAuth.js 4.24**: Authentication framework
- **bcrypt**: Password hashing (10 salt rounds)
- **JWT**: Session tokens
- **Google OAuth 2.0**: Social login
- **HTTP-only cookies**: Secure token storage

**Security Measures**:
- HTTPS-only in production
- CSRF protection via NextAuth
- Rate limiting on auth endpoints (10 requests/minute)
- Password requirements: min 8 chars, 1 uppercase, 1 number
- Brute force protection with exponential backoff
- Session invalidation on logout

---

## Technical Stack

### Frontend Technologies

**Framework & Core**:
- **Next.js 15.3.4**: React framework with SSR, API routes, file-based routing
- **React 19.0**: UI library with server components, hooks
- **TypeScript 5.0**: Type-safe development

**Styling & UI**:
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives (Dialog, Dropdown, Select, Tabs)
- **shadcn/ui**: Pre-built components (Button, Card, Input, Badge)
- **Lucide React**: Icon library (1000+ icons)

**Animation**:
- **Framer Motion 12.19**: Declarative animations and transitions
- **Lottie React**: JSON-based animations
- **React Confetti**: Celebration effects
- **GSAP** (optional): Advanced timeline animations

**Markdown & Code**:
- **react-markdown**: Render markdown content
- **rehype-katex**: Math equation rendering (KaTeX)
- **remark-gfm**: GitHub Flavored Markdown
- **Prism.js**: Syntax highlighting for code blocks

**Utilities**:
- **clsx**: Conditional className construction
- **tailwind-merge**: Merge Tailwind classes without conflicts
- **html2canvas**: Screenshot generation
- **jspdf**: PDF export
- **axios**: HTTP client

---

### Backend Technologies

**Runtime & Frameworks**:
- **Node.js 20+**: JavaScript runtime
- **Flask 3.1**: Python micro web framework
- **Next.js API Routes**: Serverless API endpoints

**Authentication**:
- **NextAuth.js 4.24**: Authentication library
- **bcrypt**: Password hashing

**Process Management**:
- **child_process**: Spawn Flask backend
- **pythonw**: Silent Python execution (Windows)
- Custom heartbeat monitoring system

---

### Database & Cloud

**Database**:
- **PostgreSQL 16**: Primary relational database
- **Supabase**: Hosted PostgreSQL with REST API
- **pg 8.16.2**: Node.js PostgreSQL client

**Schema Features**:
- JSONB columns for flexible course content
- Materialized views for leaderboard performance
- Indexes on frequently queried columns
- Foreign keys with CASCADE delete

---

### AI & Machine Learning

**AI Models**:
- **Google Gemini 2.5 Flash Lite**: Fast inference for text and image generation
- **MediaPipe Hands**: Real-time hand tracking (21 landmarks)
- **Vapi Voice AI**: Speech-to-text and text-to-speech

**Computer Vision**:
- **OpenCV 4.x**: Video capture, image processing
- **NumPy**: Numerical computations
- **Pillow (PIL)**: Image manipulation

---

### External APIs

- **YouTube Data API v3**: Video search and metadata
- **Google OAuth 2.0**: Social authentication

---

### Development Tools

**Package Management**:
- **npm**: JavaScript packages
- **pip**: Python packages

**Code Quality**:
- **ESLint 9**: JavaScript/TypeScript linting
- **TypeScript Compiler**: Type checking

**Version Control**:
- **Git**: Version control system
- **GitHub**: Code hosting and collaboration

---

## Data Flow & Processing

### 1. User Authentication Flow
```
User Input → NextAuth API → Database Lookup → bcrypt Verification → JWT Generation → Cookie Storage → Redirect
```

### 2. Magic Learn DrawInAir Flow
```
Camera → OpenCV → MediaPipe (21 landmarks) → Gesture Recognition → Canvas Rendering → 
User Gesture "Analyze" → PIL Image → Gemini AI → Math Solution → Display
```

### 3. AI Course Generation Flow
```
User Form → Next.js API → Gemini Prompt → JSON Generation → Validation → 
YouTube API Search → PostgreSQL Storage → Course ID Return → Viewer Page
```

### 4. Gamification Flow
```
Chapter Complete → API Call → Database Update → Point Calculation → Leaderboard Refresh → 
Confetti Trigger → Mood Garden Update → User Dashboard
```

### 5. Mood Garden Update Flow
```
Points Change → Calculate Stage → Load Animation → Render Scene → 
Smooth Transition → Particle Effects → Achievement Notification → Database Log
```

---

## Development & Deployment

### Local Development Setup

**Prerequisites**:
- Node.js 20+
- Python 3.9+
- PostgreSQL 16

**Installation Steps**:

```bash
# 1. Clone repository
git clone https://github.com/Anoop1925/Eduverse.git
cd Eduverse

# 2. Install dependencies
npm install
pip install -r requirements.txt

# 3. Environment variables (.env.local)
DATABASE_URL=postgresql://user:password@localhost:5432/padhaku
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
GOOGLE_GEMINI_API_KEY=your_gemini_key
NEXTAUTH_SECRET=generate_with_openssl_rand
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_oauth_client_id
GOOGLE_CLIENT_SECRET=your_oauth_secret
YOUTUBE_API_KEY=your_youtube_key
VAPI_API_KEY=your_vapi_key

# 4. Database setup
psql -U postgres -c "CREATE DATABASE padhaku;"
psql -U postgres -d padhaku -f database_schema.sql

# 5. Run development servers
npm run dev  # Next.js on http://localhost:3000
# Flask backend auto-starts on demand
```

---

### Production Deployment

**Recommended Platform**: Vercel (Next.js) + AWS/DigitalOcean (Flask)

**Next.js Deployment (Vercel)**:
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic HTTPS and CDN
4. Serverless functions for API routes

**Flask Backend Deployment**:
1. Provision VM (AWS EC2, DigitalOcean Droplet)
2. Install Python, OpenCV, MediaPipe
3. Configure systemd service for auto-restart
4. Set up reverse proxy (Nginx)
5. Enable HTTPS with Let's Encrypt

**Database Deployment**:
- Use Supabase hosted PostgreSQL (recommended)
- Or self-host with replication and backups

---

### Performance Optimizations

**Frontend**:
- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image component
- Lazy loading for heavy components (Mood Garden)
- Memoization with React.memo and useMemo

**Backend**:
- Connection pooling for PostgreSQL
- Caching with materialized views
- Auto-scaling Flask backend (starts/stops on demand)

**AI Services**:
- Response caching for common queries
- Retry logic with exponential backoff
- Rate limiting to prevent quota exhaustion

---

### Monitoring & Analytics

**Error Tracking**:
- Client-side: React Error Boundaries
- Server-side: Try-catch with logging
- User-friendly error messages

**Performance Monitoring**:
- Next.js Analytics (Web Vitals)
- Database query performance logs
- Flask backend response times

**User Analytics** (Future):
- Feature usage tracking
- User engagement metrics
- Learning progress analytics

---

## Future Enhancements

### Version 2.0 Roadmap
- **Mobile Apps**: React Native for iOS/Android
- **Multi-language Support**: Spanish, Hindi, Mandarin
- **Advanced Analytics**: ML-based learning recommendations
- **Real-time Collaboration**: Study rooms, peer code review
- **Mood Garden 3D Upgrade**: Three.js implementation
- **Daily Challenges**: Streak system with rewards

### Version 3.0 Roadmap
- **Certification System**: Blockchain-verified certificates
- **Enterprise Features**: Team dashboards, SSO
- **Content Marketplace**: User-created course sharing
- **AR/VR Integration**: Immersive learning experiences

---

## Conclusion

PadhaKU represents a comprehensive, accessible, and innovative approach to online learning. By combining AI, computer vision, gamification, and beautiful visual feedback (Mood Garden), the platform creates an engaging experience that benefits all learners, especially those with motor impairments who can learn completely hands-free.

The modular architecture ensures scalability, the dual-connectivity database approach guarantees reliability, and the auto-scaling backend optimizes resource usage. With continuous improvements and community feedback, PadhaKU aims to make limitless learning accessible to everyone.

---

**Last Updated**: November 19, 2025  
**Platform Version**: 1.0.0  
**Documentation Version**: 1.0
