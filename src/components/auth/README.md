# Authentication Components

This directory contains modular authentication components for the Friends Wanted (Galatea AI) application.

## Components

### AuthLayout
A layout wrapper that provides the cyberpunk-themed background and responsive grid container for authentication pages.

**Props:**
- `children`: React.ReactNode - The content to render inside the layout

### AuthForm
A reusable form component for both sign-in and sign-up functionality.

**Props:**
- `mode`: 'signin' | 'signup' - Determines the form configuration
- `formData`: Object containing email, password, confirmPassword (signup), displayName (signup)
- `onChange`: (field: string, value: string) => void - Form field change handler
- `onSubmit`: (e: React.FormEvent) => void - Form submission handler  
- `loading`: boolean - Loading state
- `error?`: string - Error message to display

### SocialLoginPanel
A panel containing social media authentication buttons (Google, Facebook) and feature highlights.

**Props:**
- `mode`: 'signin' | 'signup' - Determines button text and feature content
- `onGoogleAuth`: () => void - Google authentication handler
- `onFacebookAuth`: () => void - Facebook authentication handler
- `loading`: boolean - Loading state

### BrandingPanel
A branding panel showing the Galatea AI logo and feature highlights (currently unused but available for future layouts).

**Props:**
- `mode`: 'signin' | 'signup' - Determines the content messaging

## Layout Pattern

The authentication pages use a two-column grid layout:

- **Left Column**: Email/password form (`AuthForm`)
- **Right Column**: Social login options and features (`SocialLoginPanel`)

This pattern is consistent across both sign-in and sign-up pages, providing a unified user experience.

## Usage

```tsx
import { AuthLayout, AuthForm, SocialLoginPanel } from '../../components/auth';

// In your page component
<AuthLayout>
  <div className="w-full">
    <AuthForm {...formProps} />
  </div>
  <div className="w-full">
    <SocialLoginPanel {...socialProps} />
  </div>
</AuthLayout>
```

## Styling

All components use Tailwind CSS with the cyberpunk theme:
- Primary colors: `#00ffff` (cyan), `#ff0080` (magenta)
- Background: Dark gradient with subtle glow effects
- Interactive elements: Hover animations and glow effects
- Typography: Custom cyber font for headers
