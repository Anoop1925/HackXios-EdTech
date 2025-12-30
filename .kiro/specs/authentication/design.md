# Design Document - Authentication System

## Overview

The PadhaKU authentication system is built using NextAuth.js 4.24, providing a comprehensive authentication solution with support for email/password credentials and Google OAuth. The system uses JWT-based session management with HTTP-only cookies for security.

## Architecture

### Authentication Flow

```
User Input → NextAuth API Routes → Credential Verification → JWT Generation → 
HTTP-Only Cookie Storage → Session Creation → Dashboard Redirect
```

### Technology Stack

- **NextAuth.js 4.24**: Authentication framework
- **bcrypt**: Password hashing (10 salt rounds)
- **JWT**: Session token management
- **Google OAuth 2.0**: Third-party authentication
- **PostgreSQL**: User data storage
- **Next.js Middleware**: Route protection

## Components and Interfaces

### 1. NextAuth Configuration

**Location**: `pages/api/auth/[...nextauth].ts`

**Providers**:
- **CredentialsProvider**: Email/password authentication
- **GoogleProvider**: Google OAuth authentication

**Callbacks**:
- `jwt`: Adds user ID to JWT token
- `session`: Adds user ID to session object

**Session Configuration**:
- Strategy: JWT
- Max Age: 30 days (2,592,000 seconds)

### 2. Authentication API Routes

**Sign Up Endpoint**: `POST /api/auth/signup`
- Validates email format
- Checks for existing users
- Hashes password with bcrypt
- Creates user in database
- Auto-signs in user

**Sign In Endpoint**: `POST /api/auth/signin`
- Validates credentials
- Verifies password hash
- Generates JWT token
- Creates session

**Sign Out Endpoint**: `POST /api/auth/signout`
- Invalidates session
- Clears cookies
- Redirects to home page

### 3. Middleware for Route Protection

**Location**: `middleware.ts`

**Protected Routes**:
- `/dashboard/*`
- `/feature-1/*` (Magic Learn)
- `/feature-2/*` (Course Generator)
- `/feature-3/*` (Quiz System)
- `/feature-5/*` (Gamification)
- `/ai-mentor/*`

**Logic**:
```typescript
export async function middleware(req) {
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.redirect('/sign-in');
  }
  
  return NextResponse.next();
}
```

### 4. Session Wrapper Component

**Location**: `src/components/SessionWrapper.tsx`

**Purpose**: Wraps the entire application to provide session context

**Implementation**:
```typescript
import { SessionProvider } from 'next-auth/react';

export default function SessionWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

### 5. Authentication UI Components

**Sign-In Page**: `src/app/sign-in/page.tsx`
- Email/password form
- Google OAuth button
- Link to registration
- Error message display

**AuthForm Component**: `src/components/AuthForm.tsx`
- Reusable form component
- Input validation
- Loading states
- Error handling

## Data Models

### User Schema

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT,  -- bcrypt hashed, NULL for OAuth users
  name TEXT,
  image TEXT,     -- Profile picture URL
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Session Token (JWT Payload)

```typescript
interface JWTToken {
  id: string;           // User ID
  email: string;        // User email
  name: string;         // User name
  picture?: string;     // Profile picture URL
  iat: number;          // Issued at timestamp
  exp: number;          // Expiration timestamp
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Password Security
*For any* user registration or password update, the stored password hash should never match the plain text password, and bcrypt verification should succeed with the original password.
**Validates: Requirements 1.3, 7.7**

### Property 2: Session Persistence
*For any* authenticated user with a valid JWT token, accessing any page within the session validity period should maintain authentication without requiring re-login.
**Validates: Requirements 4.1, 4.2, 4.3**

### Property 3: Route Protection
*For any* protected route, an unauthenticated request should result in a redirect to the sign-in page, while an authenticated request should be allowed through.
**Validates: Requirements 5.1, 5.2, 5.5**

### Property 4: OAuth Account Creation
*For any* first-time Google OAuth user, the system should create a new account with their Google profile data and authenticate them in a single flow.
**Validates: Requirements 3.3**

### Property 5: Session Invalidation
*For any* user who signs out, subsequent requests with their previous session token should be rejected and redirect to sign-in.
**Validates: Requirements 4.4**

### Property 6: Credential Validation
*For any* sign-in attempt, providing correct credentials should result in successful authentication, while incorrect credentials should result in rejection with an error message.
**Validates: Requirements 2.1, 2.2**

### Property 7: Email Uniqueness
*For any* registration attempt with an email that already exists in the database, the system should reject the registration and return an appropriate error.
**Validates: Requirements 1.2**

## Error Handling

### Authentication Errors

1. **Invalid Credentials**
   - Error: "Invalid email or password"
   - HTTP Status: 401 Unauthorized
   - Action: Display error message, allow retry

2. **Email Already Exists**
   - Error: "An account with this email already exists"
   - HTTP Status: 409 Conflict
   - Action: Suggest sign-in instead

3. **OAuth Failure**
   - Error: "Google authentication failed. Please try again."
   - HTTP Status: 500 Internal Server Error
   - Action: Log error, allow retry

4. **Session Expired**
   - Error: "Your session has expired. Please sign in again."
   - HTTP Status: 401 Unauthorized
   - Action: Redirect to sign-in page

5. **Rate Limit Exceeded**
   - Error: "Too many attempts. Please try again later."
   - HTTP Status: 429 Too Many Requests
   - Action: Display cooldown timer

### Security Error Handling

- Never reveal whether an email exists during sign-in failures
- Log all authentication failures for security monitoring
- Implement exponential backoff for repeated failures
- Clear sensitive data from memory after use

## Testing Strategy

### Unit Tests

**Password Hashing**:
- Test bcrypt hashing produces different hashes for same password
- Test bcrypt verification succeeds with correct password
- Test bcrypt verification fails with incorrect password
- Test salt rounds configuration (10 rounds)

**JWT Token Generation**:
- Test token contains correct user data
- Test token expiration is set correctly (30 days)
- Test token signature is valid

**Session Management**:
- Test session creation on successful authentication
- Test session retrieval from cookies
- Test session invalidation on sign-out

### Property-Based Tests

**Property Test 1: Password Round-Trip**
- **Feature: authentication, Property 1: Password Security**
- Generate random passwords
- Hash each password
- Verify hash doesn't match original
- Verify bcrypt.compare succeeds
- Run 100 iterations

**Property Test 2: Session Persistence**
- **Feature: authentication, Property 2: Session Persistence**
- Create authenticated sessions with random user data
- Simulate page navigation
- Verify session remains valid
- Run 100 iterations

**Property Test 3: Route Protection**
- **Feature: authentication, Property 3: Route Protection**
- Generate random protected route paths
- Test with and without valid tokens
- Verify correct redirect behavior
- Run 100 iterations

### Integration Tests

**Full Authentication Flow**:
1. Register new user
2. Verify user created in database
3. Sign in with credentials
4. Verify session created
5. Access protected route
6. Verify access granted
7. Sign out
8. Verify session invalidated
9. Attempt to access protected route
10. Verify redirect to sign-in

**Google OAuth Flow**:
1. Initiate Google OAuth
2. Mock Google response
3. Verify account creation/sign-in
4. Verify session created
5. Verify profile data populated

### Security Tests

- Test CSRF protection
- Test XSS prevention (HTTP-only cookies)
- Test rate limiting enforcement
- Test password strength requirements
- Test brute force protection
- Test session hijacking prevention

### Configuration

- Minimum 100 iterations per property test
- Use Jest or Vitest as test framework
- Mock external services (Google OAuth)
- Use test database for integration tests
- Clean up test data after each run
