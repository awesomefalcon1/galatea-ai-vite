import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@contexts/AuthContext"
import { Layout } from "@components/Layout"
import { HomePage } from "@pages/HomePage"
import { SignInPage } from "@pages/auth/SignInPage"
import { SignUpPage } from "@pages/auth/SignUpPage"
import { CompanionsPage } from "@pages/CompanionsPage"
import { ProfilePage } from "@pages/ProfilePage"
import { DatingProfilePage } from "@pages/DatingProfilePage"
import { MatchesPage } from "@pages/MatchesPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="companions" element={<CompanionsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dating-profile" element={<DatingProfilePage />} />
            <Route path="matches" element={<MatchesPage />} />
          </Route>
          
          {/* Authentication routes without layout */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
