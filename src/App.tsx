import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { AuthProvider } from "@contexts/AuthContext"
import { Layout } from "@/Layout"
import LandingPage from "@pages/LandingPage"
import { SignInPage } from "@pages/auth/SignInPage"
import { SignUpPage } from "@pages/auth/SignUpPage"
import { CompanionsPage } from "@pages/CompanionsPage"
import { ProfilePage } from "@pages/ProfilePage/ProfilePage"
import WelcomeDashboard from "@pages/WelcomeDashboard"
import ProtectedRoute from "@contexts/ProtectedRoute"
import { MatchesPage } from "@pages/MatchesPage"
import ProfileOnboardingScreen from "@pages/ProfilePage/ProfileOnboardingScreen"
import TinderStyleOnboarding from "@pages/ProfilePage/TinderStyleOnboarding"
import SwipesPage from "@pages/SwipesPage"
import cyberpunkTheme from "@/theme/theme"

function App() {
  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <WelcomeDashboard />
                </ProtectedRoute>
              } />
              <Route path="companions" element={<CompanionsPage />} />
              <Route path="profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="matches" element={
                <ProtectedRoute>
                  <MatchesPage />
                </ProtectedRoute>
              } />
              <Route path="swipes" element={
                <ProtectedRoute>
                  <SwipesPage />
                </ProtectedRoute>
              } />
            </Route>
            
            {/* Authentication routes without layout */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            
            {/* Profile onboarding route */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <TinderStyleOnboarding />
              </ProtectedRoute>
            } />
            <Route path="/onboarding-detailed" element={
              <ProtectedRoute>
                <ProfileOnboardingScreen />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
