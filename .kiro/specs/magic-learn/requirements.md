# Requirements Document - Magic Learn Suite

## Introduction

This document describes the existing Magic Learn suite implemented in PadhaKU. Magic Learn is a three-in-one learning toolset that uses AI and computer vision to provide hands-free, interactive learning experiences. The suite consists of DrawInAir (gesture-based drawing and math solver), Image Reader (visual learning assistant), and PlotCrafter (concept explainer).

## Glossary

- **System**: The Magic Learn backend and frontend components
- **User**: A student or learner using the Magic Learn features
- **MediaPipe**: Google's hand tracking library for gesture recognition
- **Gemini**: Google's AI model for content analysis and generation
- **Flask**: Python web framework hosting the backend
- **Gesture**: A specific hand position detected by MediaPipe
- **Canvas**: The drawing surface for DrawInAir
- **Landmark**: A specific point on the hand tracked by MediaPipe (21 total)

## Requirements

### Requirement 1: DrawInAir - Hand Gesture Drawing

**User Story:** As a student, I want to draw mathematical problems in mid-air using hand gestures, so that I can solve problems without needing a keyboard or mouse.

#### Acceptance Criteria

1. WHEN a user shows their hand to the camera, THE System SHALL detect and track 21 hand landmarks in real-time
2. WHEN a user makes the drawing gesture (thumb + index finger), THE System SHALL draw magenta lines following the index fingertip
3. WHEN a user makes the moving gesture (thumb + index + middle finger), THE System SHALL display a green cursor without drawing
4. WHEN a user makes the erasing gesture (thumb + ring finger), THE System SHALL erase drawn content with a 20px eraser
5. WHEN a user makes the clearing gesture (thumb + pinky), THE System SHALL clear the entire canvas instantly
6. THE System SHALL maintain 30 FPS performance for smooth tracking
7. THE System SHALL work with both left and right hands
8. THE System SHALL implement gesture locking to prevent accidental mode switches

### Requirement 2: DrawInAir - AI Analysis

**User Story:** As a student, I want to analyze my drawn mathematical problems with AI, so that I can get step-by-step solutions.

#### Acceptance Criteria

1. WHEN a user makes the analyzing gesture (index + middle fingers, no thumb), THE System SHALL capture the current canvas state
2. WHEN the canvas is captured, THE System SHALL convert it to an image format
3. WHEN the image is ready, THE System SHALL send it to Google Gemini AI for analysis
4. WHEN analyzing mathematical equations, THE System SHALL return the equation, solution, and step-by-step explanation
5. WHEN analyzing drawings without equations, THE System SHALL return a description of the drawn image
6. WHEN analyzing text, THE System SHALL return the recognized text
7. THE System SHALL handle API rate limits by rotating through multiple API keys
8. WHEN all API keys are exhausted, THE System SHALL return an appropriate error message

### Requirement 3: Image Reader - Visual Learning Assistant

**User Story:** As a student, I want to upload images of diagrams, code screenshots, or math expressions for AI analysis, so that I can understand complex visual content.

#### Acceptance Criteria

1. WHEN a user uploads an image, THE System SHALL accept JPEG, PNG, GIF, and WebP formats
2. WHEN an image is uploaded, THE System SHALL accept files up to 10 MB in size
3. WHEN a user provides custom instructions, THE System SHALL include them in the AI analysis prompt
4. WHEN no custom instructions are provided, THE System SHALL use a default comprehensive analysis prompt
5. WHEN the image is analyzed, THE System SHALL return detailed explanations with markdown formatting
6. THE System SHALL support drag-and-drop file upload
7. THE System SHALL handle API rate limits by rotating through multiple API keys
8. WHEN analysis fails, THE System SHALL display a user-friendly error message

### Requirement 4: PlotCrafter - Concept Explainer

**User Story:** As a student, I want to get concise real-world examples explaining complex concepts, so that I can quickly understand difficult topics.

#### Acceptance Criteria

1. WHEN a user enters a concept name, THE System SHALL generate a real-world example explanation
2. THE System SHALL limit explanations to one paragraph (4-5 sentences maximum)
3. THE System SHALL use simple, conversational language
4. THE System SHALL provide relatable, everyday scenarios
5. THE System SHALL make explanations interactive and engaging
6. THE System SHALL use the format "Imagine you're [scenario]. This is how [concept] works..."
7. THE System SHALL handle API rate limits by rotating through multiple API keys
8. WHEN generation is complete, THE System SHALL display the explanation immediately

### Requirement 5: Backend Process Management

**User Story:** As a system administrator, I want the Flask backend to start automatically when needed and stop when idle, so that system resources are used efficiently.

#### Acceptance Criteria

1. WHEN a user clicks "Launch Magic Learn", THE System SHALL automatically start the Flask backend
2. WHEN the backend starts, THE System SHALL use pythonw for silent execution on Windows
3. WHEN the backend is running, THE System SHALL implement heartbeat monitoring
4. WHEN no requests are received for 15 seconds, THE System SHALL automatically stop the backend
5. WHEN the backend stops, THE System SHALL release all camera and MediaPipe resources
6. THE System SHALL provide health check endpoints for monitoring
7. WHEN the backend crashes, THE System SHALL log errors and allow restart
8. THE System SHALL run on port 5000 by default or use the PORT environment variable

### Requirement 6: Gesture Recognition Optimization

**User Story:** As a student, I want smooth and responsive gesture recognition, so that drawing feels natural and accurate.

#### Acceptance Criteria

1. THE System SHALL implement smart gesture locking with 3-frame consistency threshold
2. WHEN a user is drawing, THE System SHALL stay locked in drawing mode to prevent interruptions
3. WHEN a user intentionally switches gestures, THE System SHALL recognize the switch within 2 frames
4. WHEN a user's hand is not detected, THE System SHALL unlock after 3 frames
5. THE System SHALL process every 2nd frame for landmark detection to save CPU
6. THE System SHALL render every frame for visual smoothness
7. THE System SHALL use MediaPipe model complexity 0 for faster processing
8. THE System SHALL maintain stable 30 FPS performance

### Requirement 7: API Key Management

**User Story:** As a system administrator, I want automatic API key rotation, so that the system continues working when rate limits are reached.

#### Acceptance Criteria

1. THE System SHALL support multiple API keys for each feature (DrawInAir, Image Reader, PlotCrafter)
2. WHEN an API key reaches its rate limit, THE System SHALL automatically rotate to the next key
3. WHEN all API keys are exhausted, THE System SHALL return a 429 status code with appropriate message
4. THE System SHALL log which API key is being used for each request
5. THE System SHALL detect quota errors by checking for keywords: "quota", "rate", "limit", "exhausted"
6. WHEN a non-quota error occurs, THE System SHALL not rotate keys
7. THE System SHALL load API keys from environment variables
8. THE System SHALL filter out None values from the API key list

### Requirement 8: Security and Error Handling

**User Story:** As a system administrator, I want robust error handling and security measures, so that the system is reliable and secure.

#### Acceptance Criteria

1. THE System SHALL implement CORS to allow cross-origin requests from the frontend
2. WHEN an error occurs, THE System SHALL log the full stack trace for debugging
3. WHEN an error occurs, THE System SHALL return user-friendly error messages
4. THE System SHALL validate all input data before processing
5. THE System SHALL handle camera initialization failures gracefully
6. THE System SHALL implement signal handlers for graceful shutdown (SIGINT, SIGTERM)
7. WHEN shutting down, THE System SHALL release all resources (camera, MediaPipe)
8. THE System SHALL use threading locks to prevent race conditions with camera access

### Requirement 9: Frontend Integration

**User Story:** As a student, I want a seamless user interface for Magic Learn features, so that I can easily switch between tools and see results.

#### Acceptance Criteria

1. THE System SHALL provide a tabbed interface for DrawInAir, Image Reader, and PlotCrafter
2. WHEN a user switches tabs, THE System SHALL maintain the state of each feature
3. WHEN DrawInAir is active, THE System SHALL display the video feed with gesture overlay
4. WHEN DrawInAir is active, THE System SHALL display the current gesture name
5. WHEN analysis results are ready, THE System SHALL display them with markdown formatting
6. THE System SHALL display loading indicators during AI processing
7. THE System SHALL display error messages in a user-friendly format
8. THE System SHALL provide clear instructions for each gesture
