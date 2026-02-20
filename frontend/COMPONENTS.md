# Angular Authentication App - Components Documentation

## Overview
This Angular application includes three main components for user authentication:
- **Registration**: Create new user accounts
- **Login**: User authentication
- **Home**: Dashboard for logged-in users

All components are built using **PrimeNG** UI controls for a professional look and feel.

## Component Structure

### 1. Registration Component
**Location**: `src/app/components/registration/`

**Features**:
- Username input with required validation
- Email address input with email format validation
- Phone number input with 10-digit validation
- Password input with minimum 6 characters
- Password visibility toggle (PrimeNG password control)
- Form submission with error handling
- Navigation to login page after successful registration

**Validations Implemented**:
- ✓ Username: Required field
- ✓ Email: Required + Email format validation
- ✓ Phone: Required + 10-digit pattern validation
- ✓ Password: Required + Minimum 6 characters

**Styling**: Gradient purple background with centered card layout

### 2. Login Component
**Location**: `src/app/components/login/`

**Features**:
- Email address input with validation
- Password input with visibility toggle
- Form submission with error handling
- Automatic redirect to home on successful login
- Navigation to registration page

**Validations Implemented**:
- ✓ Email: Required + Email format validation
- ✓ Password: Required field

**Styling**: Matches registration component styling

### 3. Home Component
**Location**: `src/app/components/home/`

**Features**:
- Welcome message with username display
- User information display panel showing:
  - Username
  - Email address
  - Phone number
- Logout button
- Automatic redirect to login if not authenticated

## Services

### AuthService
**Location**: `src/app/services/auth.service.ts`

**Methods**:
- `register(user: User)`: POST request to register new user
- `login(credentials: LoginCredentials)`: POST request for user login
- `logout()`: Clear authentication data
- `setCurrentUser(user, token)`: Store user and token in localStorage
- `getCurrentUser()`: Retrieve current user
- `isLoggedIn()`: Check if user is authenticated
- `getToken()`: Get authentication token

**SSR Compatible**: Uses `isPlatformBrowser()` to handle Server-Side Rendering safely

## Routing Configuration
**Location**: `src/app/app.routes.ts`

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Login | Default route (redirects to login) |
| `/register` | Registration | User registration page |
| `/login` | Login | User login page |
| `/home` | Home | Dashboard (protected) |

## PrimeNG Components Used

- **p-button**: All action buttons (Login, Register, Logout)
- **p-inputtext**: Text inputs (username, email, phone)
- **p-password**: Password inputs with visibility toggle
- **p-card**: Content containers with headers
- **p-panel**: User information display
- **p-toast**: Toast notifications for messages
- **p-messages**: Error/success messages

## API Endpoints Expected

The application expects the following backend API endpoints:

**Post-Authentication**:
- `POST http://localhost:3000/api/auth/register` - Register new user
- `POST http://localhost:3000/api/auth/login` - User login

Expected responses:
```json
{
  "user": {
    "username": "string",
    "email": "string",
    "phone": "string"
  },
  "token": "JWT_TOKEN"
}
```

## Installation & Running

### Development Server
```bash
cd frontend
npm install
npm start
```
Navigate to `http://localhost:4200/` in your browser.

### Production Build
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## Global Styles
**Location**: `src/styles.css`

- Includes PrimeNG icons (primeicons)
- Custom form styling
- Error state styling
- Global colors and typography
- Responsive design

## Component Styling

Each component has its own CSS file:
- `registration.css` - Registration form styling
- `login.css` - Login form styling
- `home.css` - Home dashboard styling

All components feature:
- Gradient purple background (`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`)
- Centered card layout
- Form validation error styling
- Responsive design for mobile devices

## Authentication Flow

1. **No User** → Redirected to `/login`
2. **User enters credentials** → Login request sent to backend
3. **Login successful** → User and token stored in localStorage
4. **User redirected** → Redirected to `/home`
5. **Home page loads** → Displays user information
6. **User clicks logout** → Token/user cleared from localStorage
7. **User redirected** → Redirected back to `/login`

## Key Features

✓ Form validation with error messages
✓ Loading states on buttons during API calls
✓ Toast notifications for success/error messages
✓ Responsive design for mobile and desktop
✓ PrimeNG theme integration
✓ SSR (Server-Side Rendering) compatible
✓ TypeScript strict mode compatible
✓ Clean component architecture
✓ Reusable auth service
✓ Automatic login redirect protection

## Notes

- The app uses standalone components (Angular 14+)
- All HTTP calls use the async HttpClient
- CSS styling uses CSS Grid and Flexbox for responsiveness
- Form validation uses Angular's Reactive Forms
- Components are feature-rich with PrimeNG controls

## Future Enhancements

- Add password reset functionality
- Implement JWT token refresh mechanism
- Add guards for protected routes
- Implement user profile update functionality
- Add social login options
- Implement email verification
- Add two-factor authentication
