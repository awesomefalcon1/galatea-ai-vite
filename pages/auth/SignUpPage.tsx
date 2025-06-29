import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { AuthLayout, AuthForm, SocialLoginPanel } from '@components/auth';
import { LoadingScreen } from '@components/LoadingScreen';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState<'google' | 'facebook' | null>(null);
  const { signup, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      navigate('/onboarding');
    } catch (error: any) {
      setError('Failed to create account: ' + error.message);
    }

    setLoading(false);
  }

  async function handleGoogleSignUp() {
    try {
      setError('');
      setLoading(true);
      setSocialProvider('google');
      await loginWithGoogle();
      navigate('/onboarding');
    } catch (error: any) {
      setError('Failed to sign up with Google: ' + error.message);
    }

    setLoading(false);
    setSocialProvider(null);
  }

  async function handleFacebookSignUp() {
    try {
      setError('');
      setLoading(true);
      setSocialProvider('facebook');
      await loginWithFacebook();
      navigate('/onboarding');
    } catch (error: any) {
      setError('Failed to sign up with Facebook: ' + error.message);
    }

    setLoading(false);
    setSocialProvider(null);
  }

  return (
    <>
      {/* Loading Screen for Social Auth */}
      {loading && socialProvider && (
        <LoadingScreen 
          message={`Signing up with ${socialProvider === 'google' ? 'Google' : 'Facebook'}...`}
          provider={socialProvider}
        />
      )}
      
      <AuthLayout>
        {/* Left Side - Email/Password Form */}
        <div className="flex items-center justify-center min-h-screen p-8 lg:p-16">
          <div className="w-full max-w-md">
            <AuthForm
              mode="signup"
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
              mode="signup"
              onGoogleAuth={handleGoogleSignUp}
              onFacebookAuth={handleFacebookSignUp}
              loading={loading}
            />
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
