import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { AuthForm } from './components/auth/AuthForm';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StartupProfile } from './pages/StartupProfile';
import { ProfileSettings } from './pages/ProfileSettings';
import { Pricing } from './pages/Pricing';
import { LearnMore } from './pages/LearnMore';
import { Onboarding } from './pages/Onboarding';
import { OnboardingProfile } from './pages/onboarding/OnboardingProfile';
import { OnboardingStartup } from './pages/onboarding/OnboardingStartup';
import { OnboardingPreferences } from './pages/onboarding/OnboardingPreferences';
import { useAuthStore } from './store/authStore';
import { AuthProvider } from './providers/AuthProvider';

export default function App() {
  const { user } = useAuthStore();

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/learn-more" element={<LearnMore />} />

          {/* Protected routes */}
          {user ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings/profile" element={<ProfileSettings />} />
              <Route path="/startup/:id" element={<StartupProfile />} />
              
              {/* Onboarding routes */}
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/onboarding/profile" element={<OnboardingProfile />} />
              <Route path="/onboarding/startup" element={<OnboardingStartup />} />
              <Route path="/onboarding/preferences" element={<OnboardingPreferences />} />

              {user.role === 'admin' && (
                <Route path="/admin" element={<AdminDashboard />} />
              )}
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Layout>
    </AuthProvider>
  );
}