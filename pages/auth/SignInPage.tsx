import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { AuthLayout, AuthForm, SocialLoginPanel } from "@components/auth";
import { LoadingScreen } from "@components/LoadingScreen";

export function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState<'google' | 'facebook' | null>(null);
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error: any) {
      setError("Failed to sign in: " + error.message);
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      setSocialProvider('google');
      await loginWithGoogle();
      navigate("/");
    } catch (error: any) {
      setError("Failed to sign in with Google: " + error.message);
    }

    setLoading(false);
    setSocialProvider(null);
  }

  async function handleFacebookSignIn() {
    try {
      setError("");
      setLoading(true);
      setSocialProvider('facebook');
      await loginWithFacebook();
      navigate("/");
    } catch (error: any) {
      setError("Failed to sign in with Facebook: " + error.message);
    }

    setLoading(false);
    setSocialProvider(null);
  }

  return (
    <>
      {/* Loading Screen for Social Auth */}
      {loading && socialProvider && (
        <LoadingScreen 
          message={`Signing in with ${socialProvider === 'google' ? 'Google' : 'Facebook'}...`}
          provider={socialProvider}
        />
      )}
      
      <AuthLayout>
        {/* Left Side - Email/Password Form */}
        <div className="flex items-center justify-center min-h-screen p-8 lg:p-16">
          <div className="w-full max-w-md">
            <AuthForm
              mode="signin"
              formData={formData}
              onChange={handleFieldChange}
              onSubmit={handleSubmit}
              loading={loading && !socialProvider}
              error={error}
            />
          </div>
        </div>

        {/* Right Side - Social Login Panel */}
        <div className="flex items-center justify-center min-h-screen p-8 lg:p-16 bg-gray-900/20">
          <div className="w-full max-w-md">
            <SocialLoginPanel
              mode="signin"
              onGoogleAuth={handleGoogleSignIn}
              onFacebookAuth={handleFacebookSignIn}
              loading={loading}
            />
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
