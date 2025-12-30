# PadhaKU - Kiro Specification Documentation

## Overview

This directory contains Kiro specifications documenting the existing PadhaKU (Knowledge Unlimited) platform. PadhaKU is an AI-powered adaptive learning platform that combines cutting-edge AI, computer vision, and gesture recognition to create inclusive, engaging educational experiences.

**Important Note**: All specifications in this directory document features that have already been implemented and are currently operational in the production system. This is a documentation-only import to create structured Kiro specs for an existing, fully-functional application.

## Project Information

- **Project Name**: PadhaKU (Knowledge Unlimited)
- **Repository**: https://github.com/Anoop1925/Eduverse
- **Category**: EdTech / Educational Technology
- **Status**: Production - All features documented here are operational

## Technology Stack

### Frontend
- **Next.js 15.3.4**: Server-side rendering, API routes, file-based routing
- **React 19.0**: UI library with server components
- **TypeScript 5.0**: Type-safe development
- **Tailwind CSS 4.0**: Utility-first styling
- **Framer Motion 12.19**: Animations and transitions

### Backend
- **Node.js 20+**: JavaScript runtime for Next.js
- **Flask 3.1**: Python backend for computer vision features
- **NextAuth.js 4.24**: Authentication framework

### Database
- **PostgreSQL 16**: Primary relational database
- **Supabase**: Hosted PostgreSQL with REST API fallback

### AI & Machine Learning
- **Google Gemini 2.5 Flash**: AI for content generation and analysis
- **MediaPipe Hands**: Real-time hand tracking (21 landmarks)
- **Vapi Voice AI**: Speech-to-text and text-to-speech
- **OpenCV 4.x**: Video capture and image processing

## Documented Features

### 1. Authentication System
**Location**: `.kiro/specs/authentication/`

Comprehensive authentication system with:
- Email/password authentication with bcrypt hashing
- Google OAuth integration
- JWT-based session management (30-day validity)
- Protected routes with middleware
- HTTP-only cookies for security
- Rate limiting and CSRF protection

**Status**: ✅ Completed - All tasks documented and operational

### 2. Magic Learn Suite
**Location**: `.kiro/specs/magic-learn/`

Three-in-one hands-free learning toolset:

**DrawInAir**: Gesture-based drawing and math solver
- Hand tracking with MediaPipe (21 landmarks)
- 5 gesture commands (draw, move, erase, clear, analyze)
- 30 FPS performance with smart gesture locking
- AI-powered mathematical problem solving
- Works with both left and right hands

**Image Reader**: Visual learning assistant
- Upload images (JPEG, PNG, GIF, WebP up to 10MB)
- AI analysis with custom instructions
- Drag-and-drop interface
- Markdown-formatted explanations

**PlotCrafter**: Concept explainer
- Concise one-paragraph explanations
- Real-world analogies
- Simple, conversational language
- Interactive examples

**Status**: ✅ Completed - Requirements documented, design and tasks in progress

### 3. Additional Features (To Be Documented)

The following features are implemented and operational but not yet documented in Kiro specs:

- **AI Course Generator**: Personalized course creation with AI
- **Interactive Quiz System**: Gesture-based quiz answering
- **AI Mentor (AskSensei)**: 24/7 Q&A with voice support
- **Gamification System**: Points, leaderboards, achievements
- **Dashboard**: User progress tracking and analytics

## Specification Structure

Each feature follows the standard Kiro spec structure:

```
.kiro/specs/{feature-name}/
├── requirements.md  # EARS-formatted requirements with acceptance criteria
├── design.md        # Architecture, components, data models, correctness properties
└── tasks.md         # Implementation tasks (all marked as completed)
```

### Requirements Documents
- Use EARS (Easy Approach to Requirements Syntax) patterns
- Include user stories and acceptance criteria
- Define glossary terms
- Follow INCOSE quality rules

### Design Documents
- Document architecture and data flow
- Define components and interfaces
- Specify data models and schemas
- Include correctness properties for testing
- Outline error handling strategies
- Define testing approach (unit + property-based tests)

### Tasks Documents
- List all implementation tasks
- Mark status as completed (✅)
- Reference specific requirements
- Include observed file locations
- Document completion status

## Key Architectural Decisions

### 1. Dual Database Connectivity
- Primary: Direct PostgreSQL connection
- Fallback: Supabase REST API (HTTPS port 443)
- Ensures 100% network compatibility (bypasses firewall restrictions)

### 2. Auto-Managed Flask Backend
- Starts on-demand when user clicks "Launch Magic Learn"
- Heartbeat monitoring with 15-second idle timeout
- Automatic resource cleanup
- Silent execution with pythonw on Windows

### 3. API Key Rotation
- Multiple API keys per feature (DrawInAir, Image Reader, PlotCrafter)
- Automatic rotation on rate limit exhaustion
- Graceful degradation with user-friendly error messages

### 4. Gesture Recognition Optimization
- Smart gesture locking (3-frame consistency)
- Intentional switch detection (2-frame threshold)
- Process every 2nd frame for landmarks, render every frame
- MediaPipe model complexity 0 for performance
- Stable 30 FPS tracking

### 5. Security Measures
- HTTP-only cookies for session tokens
- CSRF protection via NextAuth
- bcrypt password hashing (10 salt rounds)
- Rate limiting on authentication endpoints
- Protected routes with middleware

## Development Workflow

This project was developed using an iterative, feature-driven approach:

1. **Phase 1**: Core authentication and user management
2. **Phase 2**: Magic Learn suite (DrawInAir, Image Reader, PlotCrafter)
3. **Phase 3**: AI Course Generator and Quiz System
4. **Phase 4**: Gamification and leaderboards
5. **Phase 5**: AI Mentor and voice interactions

## Testing Strategy

### Unit Tests
- Password hashing and verification
- JWT token generation and validation
- Session management
- Gesture detection logic
- API key rotation

### Property-Based Tests
- Password security (round-trip verification)
- Session persistence across page navigation
- Route protection for authenticated/unauthenticated users
- Gesture recognition consistency
- API failover behavior

### Integration Tests
- Full authentication flow (register → sign in → access protected route)
- Magic Learn end-to-end (camera → gesture → drawing → analysis)
- Course generation flow
- Gamification point calculation

## Deployment

### Frontend (Vercel)
- Next.js application
- Automatic HTTPS
- Edge network distribution
- Environment variables for API keys

### Backend (Railway/Local)
- Flask application for Magic Learn
- Auto-start/stop process management
- Port configuration via environment variable
- Health check endpoints

### Database (Supabase)
- Hosted PostgreSQL
- REST API fallback
- Real-time subscriptions
- Connection pooling

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# AI APIs (Multiple keys for rotation)
DRAWINAIR_API_KEY=...
DRAWINAIR_API_KEY_2=...
IMAGE_READER_API_KEY=...
PLOT_CRAFTER_API_KEY=...
NEXT_PUBLIC_GEMINI_API_KEY=...

# Voice AI (Optional)
VAPI_API_KEY=...
NEXT_PUBLIC_VAPI_PUBLIC_KEY=...
```

## Performance Metrics

- **DrawInAir**: 30 FPS hand tracking
- **Gesture Recognition**: <100ms response time
- **AI Analysis**: 2-7 seconds (depending on complexity)
- **Course Generation**: 10-30 seconds (depends on chapter count)
- **Session Validity**: 30 days
- **API Rate Limits**: Handled via automatic key rotation

## Accessibility Features

PadhaKU was designed with accessibility as a core principle:

- **Gesture-based controls**: Eliminates need for keyboard/mouse
- **Voice interactions**: AI Mentor supports voice input/output
- **Visual feedback**: Clear indicators for all gestures and actions
- **Responsive design**: Works on desktop, tablet, and mobile
- **Screen reader support**: Semantic HTML and ARIA labels
- **Keyboard navigation**: All features accessible via keyboard

## Future Enhancements

Planned features for future versions:

- Mobile applications (iOS/Android)
- Multi-language support
- Advanced analytics with ML recommendations
- Real-time collaborative study rooms
- Certification system with blockchain verification
- AR/VR integration for immersive learning
- Offline-first architecture
- Progressive Web App (PWA)

## Documentation Status

| Feature | Requirements | Design | Tasks | Status |
|---------|-------------|--------|-------|--------|
| Authentication | ✅ Complete | ✅ Complete | ✅ Complete | Operational |
| Magic Learn | ✅ Complete | 🚧 In Progress | 🚧 In Progress | Operational |
| Course Generator | ⏳ Pending | ⏳ Pending | ⏳ Pending | Operational |
| Quiz System | ⏳ Pending | ⏳ Pending | ⏳ Pending | Operational |
| AI Mentor | ⏳ Pending | ⏳ Pending | ⏳ Pending | Operational |
| Gamification | ⏳ Pending | ⏳ Pending | ⏳ Pending | Operational |

## Contributing to Documentation

When adding new feature specifications:

1. Create a new directory: `.kiro/specs/{feature-name}/`
2. Follow the standard structure (requirements.md, design.md, tasks.md)
3. Use EARS patterns for requirements
4. Include correctness properties in design
5. Mark all tasks as completed with observed locations
6. Update this README with the new feature

## Contact & Support

- **Repository**: https://github.com/Anoop1925/Eduverse
- **Issues**: GitHub Issues
- **Documentation**: This README and individual spec files

## License

This project is licensed under the MIT License.

---

**Last Updated**: December 29, 2024

**Documentation Created By**: Kiro AI Assistant

**Purpose**: Structured documentation of existing PadhaKU platform for future development and maintenance
